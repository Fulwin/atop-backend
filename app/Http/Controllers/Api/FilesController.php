<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use File;

class FilesController extends Controller
{
    private $result_OK = 100;
    private $result_NOT_FOUND = 99;
    private $result_FAIL = 98;

    public function save_upload(Request $request){
        if($request->hasFile('image')){
            $image = $request->file('image');
            $fileName = time().str_random(6).'.'.$image->getClientOriginalExtension();
            $image->move(public_path('Upload').'/cms/', $fileName);
            return '/Upload/cms/'.$fileName;
        }
    }

    public function delete_file(Request $request){
        $response = [
            'error_no' => $this->result_OK,
            'msg' => null,
            'isFolder' => false
        ];
        $data = $request->all();
        $filePath = public_path('Upload').'/'.$data['path'];
        if(is_file($filePath)){
            if(!File::delete($filePath)){
                $response = [
                    'error_no' => $this->result_FAIL,
                    'msg' => '删除文件失败'
                ];
            }
        }elseif(is_dir($filePath)){
            $response['isFolder'] = true;
            if(!File::deleteDirectory($filePath)){
                $response = [
                    'error_no' => $this->result_FAIL,
                    'msg' => '删除目录失败'
                ];
            }
        }

        return $response;
    }

    public function create_new_folder(Request $request){
        $response = [
            'error_no' => $this->result_OK,
            'msg' => null
        ];
        $data = $request->all();
        if(!empty($data['base'])){
            $data['base'] = '/'.$data['base'];
        }
        $folderPath = public_path('Upload').$data['base'].'/'.$data['name'];
        if(!File::makeDirectory($folderPath, $mode = 0777, true, true)){
            $response = [
                'error_no' => $this->result_FAIL,
                'msg' => '创建文件夹失败'
            ];
        }
        return $response;
    }

    public function upload(Request $request){
        $data = $request->all();
        $stringToReplace = $this->_checkStringToReplace($data['type']);
        if($stringToReplace){
            $result = $this->_saveBase64File($data, $stringToReplace);
            return [
                'error_no' => $result['result'] ? $this->result_OK : $this->result_FAIL,
                'msg' => ''
            ];
        }
        return [
            'error_no' => $this->result_FAIL,
            'msg' => 'File Type Not Supported.'
        ];
    }

    /**
     * 保存文件的方法
     * @param $data              // 文件二进制的串
     * @param $stringToReplace   // 需要被替换的表示 base64字串的值, 一般为 application 或 image
     * @return array
     */
    private function _saveBase64File($data, $stringToReplace){
        $filePath = public_path('Upload').'/'.$data['target_folder'].'/'.$data['name'];
        if(file_exists($filePath)){
            $filePath = public_path('Upload').'/'.$data['target_folder'].'/'.time().$data['name'];
        }

        if(
            file_put_contents(
                $filePath,
                base64_decode(preg_replace('#^data:'.$stringToReplace.'/\w+;base64,#i', '', $data['blob']))
            )
        ){
            return [
                'result' => true,
                'msg' => null
            ];
        }else{
            return [
                'result' => false,
                'msg' => 'something wrong'
            ];
        }
    }

    /**
     * 分析一下 mime 的值
     * @param $mime
     * @return bool
     */
    private function _checkStringToReplace($mime){
        /**
         * 在这里分析一下  $mine 的字符串, 如果是 xx/yy 的形式, 那么需要处理成 xx, 把最后的一个去掉
         */
        $explodedTypeArray = explode('/',$mime);
        if(count($explodedTypeArray) > 0){
            $stringToReplace = $explodedTypeArray[0];
        }else{
            $stringToReplace = false;
        }
        return $stringToReplace;
    }

    /**
     * 把 public/Upload 作为基准目录, 返回目录的结构
     * @param string $root
     * @param string $sub
     * @param string $sub_last
     * @return array
     */
    public function load_uploads_folder_content(Request $request){
        $data = $request->all();
        try{
            $target = $data['path'];
            if(empty($target)){
                // 表示只加载根目录下的目录名
                return [
                    'data' => Storage::disk('public')->directories('/'),
                    'error_no' => $this->result_OK
                ];
            }else{
//                $target = '/'.$target;
                $files = Storage::disk('public')->files($target);
                $fileData = [];
                if($files && is_array($files)){
                    foreach ($files as $file) {
                        $tmp = explode('/',$file);
                        $fileName = $tmp[count($tmp)-1];
                        $tmp2 = explode('.',$fileName);
                        $fileExtName = is_array($tmp2) ? $tmp2[count($tmp2) - 1] : '';
                        $fileData[] = [
                            'full_path' => $file,
                            'name' => $fileName,
                            'ext' => $fileExtName
                        ];
                    }

                }
                $folders = Storage::disk('public')->directories($target);
                return [
                    'data' => [
                        'files' => $fileData,
                        'folders' => $folders
                    ],
                    'error_no' => $this->result_OK
                ];
            }
        }catch(\Exception $e){
            return [
                'data' => [],
                'error_no' => $this->result_FAIL
            ];
        }
    }
}
