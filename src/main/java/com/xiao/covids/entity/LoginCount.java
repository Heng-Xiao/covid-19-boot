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
 * 
 * </p>
 *
 * @author vicente
 * @since 2022-07-27
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class LoginCount extends Model<LoginCount> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String loginuser;

    private String ip;

    private String address;

    private String time;

    private String numericAddress;

    private String browserName;

    private String osName;


    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
