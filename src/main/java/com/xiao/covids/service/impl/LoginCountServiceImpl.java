package com.xiao.covids.service.impl;

import com.xiao.covids.entity.LoginCount;
import com.xiao.covids.mapper.LoginCountMapper;
import com.xiao.covids.service.LoginCountService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author vicente
 * @since 2022-07-27
 */
@Service
public class LoginCountServiceImpl extends ServiceImpl<LoginCountMapper, LoginCount> implements LoginCountService {

}
