package com.xiao.covids.mapper;

import com.xiao.covids.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 用户信息表 Mapper 接口
 * </p>
 *
 * @author vicente
 * @since 2022-05-29
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
