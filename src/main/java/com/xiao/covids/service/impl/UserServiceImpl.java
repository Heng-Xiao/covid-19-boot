package com.xiao.covids.service.impl;

import com.xiao.covids.entity.User;
import com.xiao.covids.mapper.UserMapper;
import com.xiao.covids.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户信息表 服务实现类
 * </p>
 *
 * @author vicente
 * @since 2022-05-29
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
