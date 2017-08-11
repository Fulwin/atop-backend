<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use App\Models\BaseInfo;
use App\Models\Product;
use App\Models\Download;
use App\Models\Site;

class CategoriesController extends Controller
{
    private $result_OK = 100;
    private $result_NOT_FOUND = 99;
    private $result_FAIL = 98;

    private $newCategoriesId = [101, 102, 168, 169,199,141, 121, 184];
    private $baseInfoCategoryId = [
      92, 93, 96, 97, 98, 99, 103, 135, 137,139, 140, 142, 143, 144, 145, 146, 147, 148, 149,
        166,201,202,203,204,205,213,200,170,211,212,214,215,207,206,
        // 关于我们
        195,138,196,197,198
    ];
    private $downloadCategoryId = [
      150,120,183,208,
      87,155  // Solutions 中英
    ];

    public function get_site() {
      return Site::find(1);
    }

    /**
     * 保存网站设置的操作
     * @param Request $request
     * @return array
     */
    public function save_site(Request $request){
        $result = [];
        $data = $request->all();
        $site = Site::find(1);
        $site->title = $data['title'];
        $site->keyword = $data['keyword'];
        $site->description = $data['description'];
        $site->author = $data['author'];
        $site->copyright = $data['copyright'];
        $site->info = $data['info'];
        $site->quote_request_handler = $data['quote_request_handler'];
        $result['error_no'] = $site->save() ? $this->result_OK : $this->result_FAIL;
        return $result;
    }

    public function delete_category($id){
        $result = [];
        // 先检查是添加操作还是更新操作
        if( $id ){
            // 添加操作
            $result['error_no'] = Category::Remove($id) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    /**
     * 保存栏目的操作
     * @param Request $request
     * @return array
     */
    public function save_category(Request $request){
        $result = [];
        $data = $request->all();
        // 先检查是添加操作还是更新操作
        if( $data['id'] == 0 || empty(trim($data['id']))){
            // 添加操作
            unset($data['id']);
            $result['error_no'] = Category::Persistent($data) ? $this->result_OK : $this->result_FAIL;
        } else {
            $result['error_no'] = Category::Modify($data) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    public function get_category($id) {
        return Category::Fetch($id);
    }

    //
    /**
     * 根据给定的语言来加载目录树. 本接口供前端加载目录树所用, 返回 json 数据
     * @param $lang
     * @return array
     */
    public function get_tree($lang='EN'){
        return $this->_getCategoriesTree($lang);
    }

    /**
     * 加载文章的具体内容, 根据给定的 news id
     * @param $news_Id
     * @return array
     */
    public function get_article($news_Id){
        $news = News::Fetch($news_Id);
        $result = [
            'data' => $news,
            'error_no' => $news ? $this->result_OK : $this->result_FAIL
        ];
        return $result;
    }

    /**
     * 加载文章的具体内容, 根据给定的 news id
     * @param $news_Id
     * @return array
     */
    public function get_baseinfo($news_Id){
        $news = BaseInfo::Fetch($news_Id);
        $result = [
            'data' => $news,
            'error_no' => $news ? $this->result_OK : $this->result_FAIL
        ];
        return $result;
    }

    public function get_product($news_Id){
        $product = Product::Fetch($news_Id);
        $result = [
            'data' => $product,
            'error_no' => $product ? $this->result_OK : $this->result_FAIL
        ];
        return $result;
    }

    public function get_download($news_Id){
        $download = Download::Fetch($news_Id);
        // 取得可能关联的产品目录的信息
        $topLevelCategories = Category::LoadAllTopProductCategories();
        $cats = [];
        foreach ($topLevelCategories as $cat) {
            $cats[] = [
                'cat_id' => $cat->Cate_Id,
                'title' => $cat->Cate_Title,
                'lang' => $cat->Cate_Lang
            ];
        }

        $result = [
            'data' => $download,
            'cats' => $cats,
            'error_no' => $download ? $this->result_OK : $this->result_FAIL
        ];
        return $result;
    }

    /**
     * 删除指定的文章
     * @param $news_Id
     * @return array
     */
    public function delete_article($news_Id){
        $result = [];
        // 先检查是添加操作还是更新操作
        if( $news_Id ){
            // 添加操作
            $result['error_no'] = News::Remove($news_Id) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    /**
     * 删除指定的文章
     * @param $news_Id
     * @return array
     */
    public function delete_baseinfo($news_Id){
        $result = [];
        // 先检查是添加操作还是更新操作
        if( $news_Id ){
            // 添加操作
            $result['error_no'] = BaseInfo::Remove($news_Id) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    public function delete_download($news_Id){
        $result = [];
        // 先检查是添加操作还是更新操作
        if( $news_Id ){
            // 添加操作
            $result['error_no'] = Download::Remove($news_Id) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    /**
     * 删除指定的文章
     * @param $news_Id
     * @return array
     */
    public function delete_product($news_Id){
        $result = [];
        // 先检查是添加操作还是更新操作
        if( $news_Id ){
            // 添加操作
            $result['error_no'] = Product::Remove($news_Id) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    /**
     * 保存提交的文章内容
     * @param Request $request
     * @return array
     */
    public function save_article(Request $request){
        $result = [];
        $data = $request->all();
        // 先检查是添加操作还是更新操作
        if( $data['id'] == 0 ){
            // 添加操作
            unset($data['id']);
            $result['error_no'] = News::Persistent($data) ? $this->result_OK : $this->result_FAIL;
        } else {
            $result['error_no'] = News::Modify($data) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    public function save_product(Request $request){
        $result = [];
        $data = $request->all();
        // 先检查是添加操作还是更新操作
        if( $data['id'] == 0 ){
            // 添加操作
            unset($data['id']);
            $result['error_no'] = Product::Persistent($data) ? $this->result_OK : $this->result_FAIL;
        } else {
            $result['error_no'] = Product::Modify($data) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    /**
     * 保存提交的文章内容
     * @param Request $request
     * @return array
     */
    public function save_baseinfo(Request $request){
        $result = [];
        $data = $request->all();
        // 先检查是添加操作还是更新操作
        if( $data['id'] == 0 ){
            // 添加操作
            unset($data['id']);
            $result['error_no'] = BaseInfo::Persistent($data) ? $this->result_OK : $this->result_FAIL;
        } else {
            $result['error_no'] = BaseInfo::Modify($data) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    public function save_download(Request $request){
        $result = [];
        $data = $request->all();
        // 先检查是添加操作还是更新操作
        if( $data['id'] == 0 ){
            // 添加操作
            unset($data['id']);
            $result['error_no'] = Download::Persistent($data) ? $this->result_OK : $this->result_FAIL;
        } else {
            $result['error_no'] = Download::Modify($data) ? $this->result_OK : $this->result_FAIL;
        }
        return $result;
    }

    /**
     * 根据给定的目录 id 返回所包含的文章内容
     *
     * @param $id
     * @return array
     */
    public function get_articles_by_category($id) {
        $result = [
            'category'=>null,
            'articles'=>[],
            'error_no' => $this->result_OK
        ];
        $category =  Category::Fetch($id);
        if($category) {
            $articles = [];
            if(in_array($id, $this->newCategoriesId)){
                $news = $category->news();
                foreach ($news as $item) {
                    $articles[] = [
                        'News_Id' => $item->News_Id,
                        'News_Title' => $item->News_Title,
                        'News_Order' => $item->News_Order,
                        'News_State' => $item->News_State==1 ? true : false,
                        'News_AddTime' => $item->News_AddTime
                    ];
                }
                $result['category'] = [
                    'name'=>$category->Cate_Title,
                    'id'=>$category->Cate_Id,
                    'target' => 'news'
                ];
            }elseif(in_array($id, $this->baseInfoCategoryId)){
                // Base Info
                $baseInfos = $category->baseInfos();
                foreach ($baseInfos as $item) {
                    $articles[] = [
                        'News_Id' => $item->BaseInfo_Id,
                        'News_Title' => $item->BaseInfo_Title,
                        'News_Order' => $item->BaseInfo_Order,
                        'News_State' => $item->BaseInfo_State==1 ? true : false,
                        'News_AddTime' => $item->BaseInfo_AddTime
                    ];
                }
                $result['category'] = [
                    'name'=>$category->Cate_Title,
                    'id'=>$category->Cate_Id,
                    'target' => 'baseInfo'
                ];
            }elseif(in_array($id, $this->downloadCategoryId)){
                $downloads = $category->downloads();
                foreach ($downloads as $item) {
                    $articles[] = [
                        'News_Id' => $item->Down_ID,
                        'News_Title' => $item->Down_Title,
                        'News_Order' => $item->Down_Order,
                        'News_State' => $item->Down_State==1 ? true : false,
                        'News_AddTime' => $item->Down_AddTime
                    ];
                }
                $result['category'] = [
                    'name'=>$category->Cate_Title,
                    'id'=>$category->Cate_Id,
                    'target' => 'download'
                ];
            }
            else{
                // To retrieve products
                $products = $category->products();
                foreach ($products as $item) {
                    $articles[] = [
                        'News_Id' => $item->Products_ID,
                        'News_Title' => $item->Products_Title.($item->Products_recommend?' (推荐)':null),
                        'News_Order' => $item->Products_Order,
                        'News_State' => $item->Products_recommend,  // 是否为推荐产品
                        'News_AddTime' => $item->Products_AddTime
                    ];
                }
                $result['category'] = [
                    'name'=>$category->Cate_Title,
                    'id'=>$category->Cate_Id,
                    'target' => 'products'
                ];
            }
            $result['articles'] = $articles;
        }else{
            $result['error_no'] = $this->result_NOT_FOUND;
        }
        return $result;
    }

    /**
     * 根据给定的级别加载目录树
     * @param int $parentId
     * @param string $lang
     * @return array
     */
    private function _getCategoriesTree($lang = 'EN',$parentId = 0){
        $tree = [];
        $topLevelCategories = Category::LoadCategoriesByParentId($parentId,$lang);
        foreach ($topLevelCategories as $topLevelCategory) {
            // 第一级目录循环
            $bean = [
                'data' => $topLevelCategory,
                'subs' => []
            ];

            $subs = Category::LoadCategoriesByParentId($topLevelCategory->Cate_Id, $lang);
            if(count($subs)){
                foreach ($subs as $secondLevelCategory) {
                    // 第二级目录循环
                    $subBeanSecond = [
                        'data' => $secondLevelCategory,
                        'subs' => []
                    ];
                    $subsSubs = Category::LoadCategoriesByParentId($secondLevelCategory->Cate_Id,$lang);
                    if(count($subsSubs) > 0){
                        // 第三级目录循环
                        $subBeanThird = [];
                        foreach ($subsSubs as $thirdLevelCategory) {
                            $subBeanThird[$thirdLevelCategory->Cate_Id] = [
                                'data' => $thirdLevelCategory,
                                'subs' => []
                            ];
                        }
                        $subBeanSecond['subs'] = $subBeanThird;
                    }
                    // 把包含所有子目录的数组添加到第一级的 subs 中
                    $bean['subs'][$secondLevelCategory->Cate_Id] = $subBeanSecond;
                }
            }
            $tree[$topLevelCategory->Cate_Id] = $bean;
        }
        return $tree;
    }
}
