package com.xiao.covids.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author vicente
 * @since 2022-05-31
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class ChinaTotal extends Model<ChinaTotal> {

    private static final long serialVersionUID = 1L;

    private String nowtime;

    private Long confirm;

    @TableField("nowConfirm")
    private Long nowConfirm;

    @TableField("importedCase")
    private Long importedCase;

    private Long dead;

    private Long heal;

    @TableField("noInfect")
    private Long noInfect;

    private Long localAccConfirm;

    private Long suspect;

    @TableField("nowSevere")
    private Long nowSevere;

    @TableField("showLocalConfirm")
    private Long showLocalConfirm;

    private Long showlocalinfeciton;

    @TableField("noInfectH5")
    private Long noInfectH5;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
