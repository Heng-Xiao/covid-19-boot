package com.xiao.covids.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author vicente
 * @since 2022-07-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class QqNews extends Model<QqNews> {

    private static final long serialVersionUID = 1L;

    private String title;

    private String publishTime;

    private String newsUrl;

    private String srcfrom;

    private String shortcut;

    private String cmsId;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
