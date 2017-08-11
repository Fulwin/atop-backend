<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Carbon\Carbon;

class Product extends Model
{
    protected $fillable = [
        'name'
    ];

    public static function Fetch($news_Id){
        return self::where('Products_ID',$news_Id)->first();
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
        $productToBeUpdate = self::find($data['id']);
        if($productToBeUpdate){
            foreach ($data as $fieldName=>$value) {
                if($fieldName !== 'id'){
                    if($fieldName == 'Products_AddTime' && !empty($value)){
                        $carbon = Carbon::parse($value);
                        $productToBeUpdate->Products_AddTime = $carbon->toDateString();
                    }else{
                        $productToBeUpdate->$fieldName = $value;
                    }
                }
            }
            return $productToBeUpdate->save();
        }else{
            return false;
        }
    }

    public static function Persistent($data){
        $product = self::create();
        if($data['Products_Order'] == 0){
            // 获取目前最大的 order 数字
            $latestProduct = self::where('Products_CateID',$data['Products_CateID'])->orderBy('Products_Order','DESC')->first();
            // 然后给新加的附上一个更大的
            $data['Products_Order'] = $latestProduct ? ($latestProduct->Products_Order + 1) : 1;
        }
        if($data) {
            $Product_CateName = Category::Fetch($data['Products_CateID'])->Cate_Title;
            $data['Products_CateName'] = $Product_CateName;
            foreach ($data as $fieldName=>$value) {
                if($fieldName == 'Products_ID'){
                    $product->Products_ID = $product->id+1000;  // 防止有和以前重复的, 所以认为添加了200
                }elseif($fieldName == 'Products_AddTime' && !empty($value)){
                    $product->Products_AddTime = Carbon::createFromFormat('Y-m-d',$value)->toDateString();
                }elseif($fieldName=='Products_recommend'){
                    $product->Products_recommend = empty($value) ? 0 : $value;
                }else{
                    $product->$fieldName = $value;
                }
            }
            return $product->save();
        }else{
            return false;
        }
    }
}
