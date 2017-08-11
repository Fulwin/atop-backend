<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\News;
use App\Models\BaseInfo;
use App\Models\Product;
use App\Models\Download;
use Carbon\Carbon;

class Category extends Model
{
    //

    /**
     * 根据给定的父级目录ID 加载子目录的静态方法
     *
     * @param $id
     * @param string $lang
     * @return mixed
     */
    public static function LoadCategoriesByParentId($id,$lang='EN') {
        return self::where('Cate_Lang',$lang)
            ->where('Cate_ParentId',$id)
//            ->where('Cate_State',1)
            ->select('Cate_Id','Cate_Title')
            ->orderBy('Cate_Order','ASC')
            ->get();
    }

    public static function LoadAllTopProductCategories() {
        return self::where('Cate_ParentId',89)
            ->orWhere('Cate_ParentId',157)
            ->select('Cate_Id','Cate_Title','Cate_Lang')
            ->orderBy('Cate_Order','ASC')
            ->get();
    }

    public static function Fetch($id){
        return self::where('Cate_Id',$id)->first();
    }

    public function news(){
        return News::where('News_CateId',$this->Cate_Id)
            ->orderBy('News_IsIndex','DESC')->orderBy('News_Order','Desc')->get();
    }

    public function baseInfos(){
        return BaseInfo::where('BaseInfo_CateId',$this->Cate_Id)->orderBy('BaseInfo_Order','Desc')->get();
    }

    public function products(){
        return Product::where('Products_CateId',$this->Cate_Id)->orderBy('Products_Order','Desc')->get();
    }

    public function downloads(){
        return Download::where('Down_CateId',$this->Cate_Id)->orderBy('Down_Order','Desc')->get();
    }

    /**
     * 创建一个新的 News 的真正方法
     * @param $data
     * @return bool
     */
    public static function Persistent($data){
        if($data['Cate_Order'] == 0){
            // 获取目前最大的 order 数字
            $latestCategory = self::where('Cate_ParentID',$data['Cate_ParentID'])
                ->orderBy('Cate_Order','DESC')
                ->first();
            // 然后给新加的附上一个更大的
            $data['Cate_Order'] = $latestCategory ? ($latestCategory->Cate_Order + 1) : 1;
        }
        if($data) {
            $category = self::create();
            foreach ($data as $fieldName=>$value) {
                if($fieldName == 'Cate_AddTime'){
                    $category->Cate_AddTime = Carbon::createFromFormat('Y-m-d',$value)->toDateString();
                }elseif($fieldName=='Cate_State'){
                    $category->$fieldName = empty($value) ? 0 : $value;
                }else{
                    $category->$fieldName = $value;
                }
                $category->Cate_Id = $category->id + 200;
            }
            return $category->save();
        }else{
            return false;
        }
    }

    /**
     * 保存已经存在的栏目的方法
     * @param $data
     * @return bool
     */
    public static function Modify($data){
        $categoryToBeUpdate = self::find($data['id']);
        if($categoryToBeUpdate){
            foreach ($data as $fieldName=>$value) {
                if($fieldName !== 'id'){
                    if($fieldName == 'Cate_AddTime'){
                        $categoryToBeUpdate->Cate_AddTime = Carbon::createFromFormat('Y-m-d',$value)->toDateString();
                    }else{
                        $categoryToBeUpdate->$fieldName = $value;
                    }
                }
            }
            return $categoryToBeUpdate->save();
        }else{
            return false;
        }
    }

    public static function Remove($id){
        $category = self::Fetch($id);
        if($category)
            return $category->delete();
        return false;
    }
}
