<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Category;


class ImportCatsData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $content = file_get_contents(__DIR__.'/cats_data.txt');
        $contentArray = explode('</tr><tr>',$content);

        $fieldSeperator = '</td><td>';
        $data = [];
        foreach ($contentArray as $row) {
            $row = str_replace('<tr><td>','',$row);
            $rowData = explode($fieldSeperator,$row);
            $fieldsCount = count($rowData);
            $rowData[0] = str_replace('<td>','',$rowData[0]);
            $rowData[$fieldsCount-1] = str_replace('</tr>','',$rowData[$fieldsCount-1]);
            $rowData[$fieldsCount-1] = str_replace('</td>','',$rowData[$fieldsCount-1]);
            $data[] = $rowData;
        }

        // 取得数据库的字段名称
        $fieldNames = $data[0];
        unset($data[0]);
        foreach ($data as $key=>$dataArray) {
            $category = Category::create();
            foreach ($dataArray as $idx => $val) {
                $fieldName = trim($fieldNames[$idx]);
                $category->$fieldName = $val;
            }
            $category->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
