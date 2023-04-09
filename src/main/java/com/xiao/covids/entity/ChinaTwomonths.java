package com.xiao.covids.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.time.LocalDateTime;
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
 * @since 2022-06-05
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class ChinaTwomonths extends Model<ChinaTwomonths> {

    private static final long serialVersionUID = 1L;

    private LocalDateTime yeardate;

    @TableField("importedCase")
    private Long importedCase;

    @TableField("healRate")
    private String healRate;

    @TableField("deadRate")
    private String deadRate;

    private Long confirm;

    private Long suspect;

    private Long heal;

    private Long dead;

    @TableField("nowSevere")
    private Long nowSevere;

    @TableField("noInfect")
    private Long noInfect;

    @TableField("localConfirm")
    private Long localConfirm;

    @TableField("noInfectH5")
    private Long noInfectH5;

    @TableField("localConfirmH5")
    private Long localConfirmH5;

    private Long localAccConfirm;

    @TableField("nowConfirm")
    private Long nowConfirm;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
