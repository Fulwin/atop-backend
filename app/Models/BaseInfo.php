<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Carbon\Carbon;

class BaseInfo extends Model
{
    /**
     * 根据 News Id 取得数据库记录
     *
     * @param $news_Id
     * @return mixed
     */
    public static function Fetch($news_Id){
        return self::where('BaseInfo_Id',$news_Id)->first();
    }

    /**
     * 根据指定的 News Id 来删除一个记录
     * @param $news_Id
     * @return bool
     */
    public static function Remove($news_Id){
        $newsToBeDeleted = self::Fetch($news_Id);
        if($newsToBeDeleted){
            return $newsToBeDeleted->delete();
        }
        return true;
    }

    /**
     * 更新数据库的方法
     * @param $data
     * @return bool
     */
    public static function Modify($data){
        $newsToBeUpdate = self::find($data['id']);
        if($newsToBeUpdate){
            foreach ($data as $fieldName=>$value) {
                if($fieldName !== 'id'){
                    if($fieldName === 'BaseInfo_AddTime' && strlen($value) > 11){
                        $newsToBeUpdate->BaseInfo_AddTime = Carbon::createFromFormat('Y-m-d',$value)->toDateString();
                    }else{
                        $newsToBeUpdate->$fieldName = $value;
                    }
                }
            }
            return $newsToBeUpdate->save();
        }else{
            return false;
        }
    }

    /**
     * 持久化 BaseInfo 的方法
     * @param $data
     * @return bool
     */
    public static function Persistent($data){
        $baseInfo = self::create();
        if($data['BaseInfo_Order'] == 0){
            // 获取目前最大的 order 数字
            $latestBaseInfo = self::where('BaseInfo_CateId',$data['BaseInfo_CateId'])->orderBy('BaseInfo_Order','DESC')->first();
            // 然后给新加的附上一个更大的
            $data['BaseInfo_Order'] = $latestBaseInfo ? ($latestBaseInfo->BaseInfo_Order + 1) : 1;
        }
        if($data) {
            $BaseInfo_CateName = Category::Fetch($data['BaseInfo_CateId'])->Cate_Title;
            $data['BaseInfo_CateName'] = $BaseInfo_CateName;
            foreach ($data as $fieldName=>$value) {
                if($fieldName == 'BaseInfo_Id'){
                    $baseInfo->BaseInfo_Id = $baseInfo->id+200;  // 防止有和以前重复的, 所以认为添加了200
                }elseif($fieldName == 'BaseInfo_AddTime'){
                    $baseInfo->BaseInfo_AddTime = Carbon::createFromFormat('Y-m-d',$value)->toDateString();
                }else{
                    $baseInfo->$fieldName = $value;
                }
            }
            return $baseInfo->save();
        }else{
            return false;
        }
    }
}
