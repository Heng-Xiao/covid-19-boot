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
 * @since 2022-05-31
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class ChinaTwomonthsAdd extends Model<ChinaTwomonthsAdd> {

    private static final long serialVersionUID = 1L;

    private LocalDateTime yeardate;

    @TableField("importedCase")
    private Long importedCase;

    @TableField("localConfirmadd")
    private Long localConfirmadd;

    private Long infect;

    private Long localinfectionadd;

    @TableField("healRate")
    private String healRate;

    @TableField("deadRate")
    private String deadRate;

    private Long confirm;

    private Long suspect;

    private Long heal;

    private Long dead;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
