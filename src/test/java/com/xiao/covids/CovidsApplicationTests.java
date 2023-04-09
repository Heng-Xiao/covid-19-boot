package com.xiao.covids;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.xiao.covids.entity.*;

import com.xiao.covids.mapper.UserMapper;
import com.xiao.covids.service.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Slf4j
@SpringBootTest
class CovidsApplicationTests {

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserService userService;

    @Autowired
    private ChinaTotalService chinaTotalService;

    @Autowired
    private RiskAreasService riskAreasService;

    @Autowired
    private ChinaTwomonthsAddService chinaTwomonthsAddService;

    @Autowired
    NewsService newsService;
    @Autowired
    IEmailService emailService;
    @Test
    void contextLoads() {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(User::getName,"admin").lt(User::getPassword,"admin");
// 开始查询符合的单条记录（如果满足条件的记录有多条，那就不能用这个方法，会报错。）
        User user = userService.getOne(queryWrapper);
        List<User> list = userService.list();
        log.info(String.valueOf(list));
        log.info(String.valueOf(user));

        QueryWrapper<User> queryWrapper1=new QueryWrapper();
//        queryWrapper.like("name","admin");
        queryWrapper1.eq("name", "admin").eq("password", "admin");
        // queryWrapper.last("LIMIT 1") //如果是多个会抛出异 常加上限制条件
        System.out.println(userService.getOne(queryWrapper1));
    }
    @Test
    public void downloadLocal(HttpServletResponse response) throws FileNotFoundException {
        // 下载本地文件
        String fileName = "Operator.doc".toString(); // 文件的默认保存名
        // 读到流中
        InputStream inStream = new FileInputStream("d:/Operator.doc");// 文件的存放路径
        // 设置输出的格式
        response.reset();
        response.setContentType("bin");
        response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        // 循环取出流中的数据
        byte[] b = new byte[100];
        int len;
        try {
            while ((len = inStream.read(b)) > 0)
                response.getOutputStream().write(b, 0, len);
            inStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 测试简单文本文件
     */
    @Test
    public void EmailTest() {
        emailService.sendSimpleMail("1730509384@qq.com", "测试邮件", "springboot 邮件测试");
    }


    @Test
    void riskAreasTest(){
        List<RiskAreas> riskAreasList = riskAreasService.list();
        System.out.println(riskAreasList);
    }

    @Test
    void chinaTotalServiceTest(){
        QueryWrapper<ChinaTotal> queryWrapper=new QueryWrapper();
        queryWrapper.select("confirm", "nowConfirm","importedCase","dead");
        queryWrapper.orderByDesc("nowtime").last("limit 1");
        ChinaTotal chinaTotal = chinaTotalService.getOne(queryWrapper);
        Long confirm = chinaTotal.getConfirm();
        Long dead = chinaTotal.getDead();
        double deadHeal1 = dead / confirm.doubleValue()*100;

        String  str = String.format("%.2f",deadHeal1);
        double deadHeal = Double.parseDouble(str);
        System.out.println(deadHeal);

    }



    @Test
    void getChinaTwoMonthsAddListTest() {
        QueryWrapper<ChinaTwomonthsAdd> queryWrapper=new QueryWrapper();
        queryWrapper.select("yeardate", "importedCase","localConfirmadd");
        List<ChinaTwomonthsAdd> chinaTwomonthsAddList = chinaTwomonthsAddService.list(queryWrapper);
        System.out.println(chinaTwomonthsAddList);
    }

    @Test
    void getNewsListTest() {
        List<News> newsServiceList = newsService.list();

//        System.out.println(newsServiceList);
        for (News news : newsServiceList) {

//

        }


    }}
