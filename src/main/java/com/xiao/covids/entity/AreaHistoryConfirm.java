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
 * @since 2022-06-04
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AreaHistoryConfirm extends Model<AreaHistoryConfirm> {

    private static final long serialVersionUID = 1L;

    private LocalDateTime yeardate;

    @TableField(exist = true)
    private Long 西藏;

    @TableField(exist = true)
    private Long 澳门;

    @TableField(exist = true)
    private Long 青海;

    @TableField(exist = true)
    private Long 台湾;

    @TableField(exist = true)
    private Long 香港;

    @TableField(exist = true)
    private Long 贵州;

    @TableField(exist = true)
    private Long 吉林;

    @TableField(exist = true)
    private Long 新疆;

    @TableField(exist = true)
    private Long 宁夏;

    @TableField(exist = true)
    private Long 内蒙古;

    @TableField(exist = true)
    private Long 甘肃;

    @TableField(exist = true)
    private Long 天津;

    @TableField(exist = true)
    private Long 山西;

    @TableField(exist = true)
    private Long 辽宁;

    @TableField(exist = true)
    private Long 黑龙江;

    @TableField(exist = true)
    private Long 海南;

    @TableField(exist = true)
    private Long 河北;

    @TableField(exist = true)
    private Long 陕西;

    @TableField(exist = true)
    private Long 云南;

    @TableField(exist = true)
    private Long 广西;

    @TableField(exist = true)
    private Long 福建;

    @TableField(exist = true)
    private Long 上海;

    @TableField(exist = true)
    private Long 北京;

    @TableField(exist = true)
    private Long 江苏;

    @TableField(exist = true)
    private Long 四川;

    @TableField(exist = true)
    private Long 山东;

    @TableField(exist = true)
    private Long 江西;

    @TableField(exist = true)
    private Long 重庆;

    @TableField(exist = true)
    private Long 安徽;

    @TableField(exist = true)
    private Long 湖南;

    @TableField(exist = true)
    private Long 河南;

    @TableField(exist = true)
    private Long 广东;

    @TableField(exist = true)
    private Long 浙江;

    @TableField(exist = true)
    private Long 湖北;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
