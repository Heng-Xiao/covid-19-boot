package com.xiao.covids.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 新闻信息表
 * </p>
 *
 * @author vicente
 * @since 2022-06-05
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class News extends Model<News> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "new_id", type = IdType.AUTO)
    private Integer newId;

    /**
     * 发布时间
     */
    private LocalDateTime publishTime;

    /**
     * 新闻标题
     */
    private String newsTitle;

    /**
     * 新闻概要
     */
    private String newsSummary;

    /**
     * 新闻来源
     */
    private String newsSource;


    @Override
    protected Serializable pkVal() {
        return this.newId;
    }

}
