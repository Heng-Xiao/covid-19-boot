package com.xiao.covids.service.impl;

import com.xiao.covids.entity.News;
import com.xiao.covids.mapper.NewsMapper;
import com.xiao.covids.service.NewsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 新闻信息表 服务实现类
 * </p>
 *
 * @author vicente
 * @since 2022-06-05
 */
@Service
public class NewsServiceImpl extends ServiceImpl<NewsMapper, News> implements NewsService {

}
