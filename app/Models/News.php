<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Carbon\Carbon;

class News extends Model
{
    //
    public function category(){
        return $this->belongsTo('App\Models\Category');
    }

    /**
     * 根据 News Id 取得数据库记录
     *
     * @param $news_Id
     * @return mixed
     */
    public static function Fetch($news_Id){
        return self::where('News_Id',$news_Id)->first();
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
                    if($fieldName == 'News_AddTime'){
                        $newsToBeUpdate->News_AddTime = Carbon::createFromFormat('Y-m-d',$value)->toDateString();
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
     * 创建一个新的 News 的真正方法
     * @param $data
     * @return bool
     */
    public static function Persistent($data){
        $news = self::create();
        if($data['News_Order'] == 0){
            // 获取目前最大的 order 数字
            $latestNews = self::where('News_CateId',$data['News_CateId'])->orderBy('News_Order','DESC')->first();
            // 然后给新加的附上一个更大的
            $data['News_Order'] = $latestNews ? ($latestNews->News_Order + 1) : 1;
        }
        if($data) {
            $News_CateName = Category::Fetch($data['News_CateId'])->Cate_Title;
            $data['News_CateName'] = $News_CateName;
            foreach ($data as $fieldName=>$value) {
                if($fieldName == 'News_Id'){
                    $news->News_Id = $news->id+200;  // 防止有和以前重复的, 所以认为添加了200
                }else{
                    $news->$fieldName = $value;
                }
            }
            return $news->save();
        }else{
            return false;
        }
    }
}
