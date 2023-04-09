package com.xiao.covids.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author vicente
 * @since 2022-06-05
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AreaHistoryConfirmAdd extends Model<AreaHistoryConfirmAdd> {

    private static final long serialVersionUID = 1L;

    private LocalDateTime yeardate;
    @TableField(exist = true)
    private String 西藏;
    @TableField(exist = true)
    private String 澳门;
    @TableField(exist = true)
    private String 青海;
    @TableField(exist = true)
    private String 台湾;
    @TableField(exist = true)
    private String 香港;
    @TableField(exist = true)
    private String 贵州;
    @TableField(exist = true)
    private String 吉林;
    @TableField(exist = true)
    private String 新疆;
    @TableField(exist = true)
    private String 宁夏;
    @TableField(exist = true)
    private String 内蒙古;
    @TableField(exist = true)
    private String 甘肃;
    @TableField(exist = true)
    private String 天津;
    @TableField(exist = true)
    private String 山西;
    @TableField(exist = true)
    private String 辽宁;
    @TableField(exist = true)
    private String 黑龙江;
    @TableField(exist = true)
    private String 海南;
    @TableField(exist = true)
    private String 河北;
    @TableField(exist = true)
    private String 陕西;
    @TableField(exist = true)
    private String 云南;
    @TableField(exist = true)
    private String 广西;
    @TableField(exist = true)
    private String 福建;
    @TableField(exist = true)
    private String 上海;
    @TableField(exist = true)
    private String 北京;
    @TableField(exist = true)
    private String 江苏;
    @TableField(exist = true)
    private String 四川;
    @TableField(exist = true)
    private String 山东;
    @TableField(exist = true)
    private String 江西;
    @TableField(exist = true)
    private String 重庆;
    @TableField(exist = true)
    private String 安徽;
    @TableField(exist = true)
    private String 湖南;
    @TableField(exist = true)
    private String 河南;
    @TableField(exist = true)
    private String 广东;
    @TableField(exist = true)
    private String 浙江;
    @TableField(exist = true)
    private String 湖北;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
