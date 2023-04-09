package com.xiao.covids.controller;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xiao.covids.entity.*;
import com.xiao.covids.service.*;
import com.xiao.covids.util.IpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpSession;
import java.io.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/**
 * @author xiao
 * @Description: 登录
 */

@Controller
public class IndexController {
    @Autowired
    IEmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private LoginCountService loginCountService;
    @Autowired
    private RiskAreasService riskAreasService;
    @Autowired
    private ChinaTotalService chinaTotalService;

    @GetMapping(value = {"/","/login","/login.html"})
    public String loginPage(){

        return "login";
    }


    @GetMapping(value = {"/regist","/regist.html"})
    public String registPage(){

        return "regist";
    }


    @PostMapping("/sendyanzm")
    @ResponseBody
    //得到ajax的数据，参数写json数据的key值，就能得到value值
    public HashMap<String,String> sendyanzm(@RequestParam String email,Model model,HttpSession session) throws ParseException, MessagingException {
        HashMap<String, String> map = new HashMap<String, String>();
        if (Objects.nonNull((session.getAttribute("time")))){
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
                    "yyyy-MM-dd HH:mm:ss");
            //再获取当前时间进行判断
            Date time1 = simpleDateFormat.parse((String) session.getAttribute("time"));
            Long time = time1.getTime();
            Long curtime = System.currentTimeMillis();
            //lci就是分钟数，如果lci<=4，就是设定为五分钟之内
            Long tci = (curtime - time)/(1000*60);
            System.out.println(tci);
            if (tci>=5){
                String code = IpUtil.yanzm();
                String time2  = simpleDateFormat.format(new Date());
//                model.addAttribute("error","验证码已过期！重新发送完成！");
                session.setAttribute("code",code);
                session.setAttribute("time",time2);
                String content = "<h1 style=\"font-weight: 100;font-size: 19px;color: rgba(0, 0, 0, 1);\">亲爱的用户：<br></h1>"+
                        "<div style=\"text-indent: 38px;font-size: 15px;font-weight: 100;\">您好！您正在进行邮箱验证，本次请求的验证码为：</div>"+
                        "<div style=\"background-color: rgba(233, 241, 246, 1);font-size: 35px;color: rgba(76, 141, 174, 1);text-align: center;\">"+code+"</div>"+
                        "<div style=\"text-indent: 38px;font-size: 15px;font-weight: 100;\">本验证码5分钟内有效，请在5分钟内完成验证。（请勿泄露此验证码）如非本人操作，请忽略该邮件。(这是一封自动发送的邮件，请不要直接回复）</div>"+
                        "</p>\n" +
                        "<p style=\"text-align:right;\">\n" +
                        "\t<span style=\"background-color:#FFFFFF;font-size:16px;color:#000000;\"><span style=\"color:#000000;font-size:16px;background-color:#FFFFFF;\"><span class=\"token string\" style=\"font-family:&quot;font-size:16px;color:#000000;line-height:normal !important;background-color:#FFFFFF;\">平台管理员</span></span></span> \n" +
                        "</p>\n" +
                        "<p style=\"text-align:right;\">\n" +
                        "\t<span style=\"background-color:#FFFFFF;font-size:14px;\"><span style=\"color:#FF9900;font-size:18px;\"><span class=\"token string\" style=\"font-family:&quot;font-size:16px;color:#000000;line-height:normal !important;\"><span style=\"font-size:16px;color:#000000;background-color:#FFFFFF;\">"+time+"</span><span style=\"font-size:18px;color:#000000;background-color:#FFFFFF;\"></span></span></span></span> \n" +
                        "</p>";
                emailService.sendHtmlMail(email, "注册国内疫情可视化平台验证码",content);

                map.put("error","验证码已过期！重新发送完成！");

                return map;
            }
            map.put("error","验证码发送时间小于5分钟，有效！");
//            model.addAttribute("error","验证码发送时间小于5分钟，有效！");
            return map;
        }

        String code = IpUtil.yanzm();
        session.setAttribute("code",code);
        Date date = new Date();
        String strDateFormat = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(strDateFormat);
        String time  = sdf.format(date);
        session.setAttribute("time",time);

        String content = "<h1 style=\"font-weight: 100;font-size: 19px;color: rgba(0, 0, 0, 1);\">亲爱的用户：<br></h1>"+
                "<div style=\"text-indent: 38px;font-size: 15px;font-weight: 100;\">您好！您正在进行邮箱验证，本次请求的验证码为：</div>"+
                "<div style=\"background-color: rgba(233, 241, 246, 1);font-size: 35px;color: rgba(76, 141, 174, 1);text-align: center;\">"+code+"</div>"+
                "<div style=\"text-indent: 38px;font-size: 15px;font-weight: 100;\">本验证码5分钟内有效，请在5分钟内完成验证。（请勿泄露此验证码）如非本人操作，请忽略该邮件。(这是一封自动发送的邮件，请不要直接回复）</div>"+
                "</p>\n" +
                "<p style=\"text-align:right;\">\n" +
                "\t<span style=\"background-color:#FFFFFF;font-size:16px;color:#000000;\"><span style=\"color:#000000;font-size:16px;background-color:#FFFFFF;\"><span class=\"token string\" style=\"font-family:&quot;font-size:16px;color:#000000;line-height:normal !important;background-color:#FFFFFF;\">平台管理员</span></span></span> \n" +
                "</p>\n" +
                "<p style=\"text-align:right;\">\n" +
                "\t<span style=\"background-color:#FFFFFF;font-size:14px;\"><span style=\"color:#FF9900;font-size:18px;\"><span class=\"token string\" style=\"font-family:&quot;font-size:16px;color:#000000;line-height:normal !important;\"><span style=\"font-size:16px;color:#000000;background-color:#FFFFFF;\">"+time+"</span><span style=\"font-size:18px;color:#000000;background-color:#FFFFFF;\"></span></span></span></span> \n" +
                "</p>";

        emailService.sendHtmlMail(email, "注册国内疫情可视化平台验证码",content);
//        model.addAttribute("error","验证码发送成功");
        map.put("error","验证码发送成功");
        System.out.println(email);
        return map;

    }



//    @GetMapping(value = {"/sendyanzm"})
//    public String sendyanzm(){
//
//        return "regist";
//    }

    @PostMapping("/regist")
    public String index1(@RequestParam String email,@RequestParam String yanzm,@RequestParam String name,@RequestParam String password, HttpSession session, Model model,HttpServletRequest request) throws ParseException {

        System.out.println("yanzm"+yanzm);
        System.out.println((String) session.getAttribute("code"));
        System.out.println(yanzm.equalsIgnoreCase((String) session.getAttribute("code")));

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(password);
        QueryWrapper<User> queryWrapper=new QueryWrapper();

        queryWrapper.eq("name", user.getName());

        User userdata = userService.getOne(queryWrapper);


        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss");
        //再获取当前时间进行判断
        Date time1 = simpleDateFormat.parse((String) session.getAttribute("time"));
        Long time2 = time1.getTime();
        Long curtime = System.currentTimeMillis();
        //lci就是分钟数，如果lci<=4，就是设定为五分钟之内
        Long tci = (curtime - time2)/(1000*60);

        if ("".equals(user.getName()) || "".equals(user.getPassword())){
            model.addAttribute("error","用户名或密码不能为空！");
            return "regist";
        }else if (userdata != null){
            model.addAttribute("error","用户名已重复！");
            return "regist";
        }else if(!yanzm.equalsIgnoreCase((String) session.getAttribute("code"))){
            model.addAttribute("error","验证码不正确！");
            return "regist";
        }else if (tci >=5){
            model.addAttribute("error","验证码已过期！");
            return "regist";
        }

        //获取IP地址
        String ip = IpUtil.getIpAddr(request);

        session.setAttribute("loginUser",user);

        //获取浏览器名称
        String browserName = IpUtil.browserName(request);
        //获取操作系统名称
        String osName = IpUtil.osName(request);

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = formatter.format(date);
        //时间
        LoginCount loginCount = new LoginCount();
        loginCount.setIp(ip);
        loginCount.setBrowserName(browserName);
        loginCount.setOsName(osName);
        loginCount.setTime(time);
        loginCount.setLoginuser(user.getName());
        try {
            String[] str  = IpUtil.getCityInfo(ip);
            //获取数字地址
            loginCount.setNumericAddress(str[3]);
            //获取ip所在地
            loginCount.setAddress(str[5].substring(0,str[5].indexOf(" ip138提供")));
            emailService.sendSimpleMail("1730509384@qq.com", "登录国内疫情可视化平台通知", "登录用户："+ name + "<br>"+"登录时间："+ time + "<br>"+ "登录IP："+ip+ "<br>"+ "登录地址：" + str[5].substring(0,str[5].indexOf(" ip138提供")));
        } catch (IOException e) {
            e.printStackTrace();
        }
        userService.save(user);
        //保存
        loginCountService.save(loginCount);

        return "redirect:/main.html";

    }



    @GetMapping(value = {"/scanboard.html","/scanboard"})
    public String riskscanboard(){

        return "risk/scanboard";
    }



    @PostMapping("/login")
    public String index(User user, HttpSession session, Model model,HttpServletRequest request){

        QueryWrapper<User> queryWrapper=new QueryWrapper();

        queryWrapper.eq("name", user.getName()).eq("password", user.getPassword());

        User userdata = userService.getOne(queryWrapper);
        //获取IP地址
        String ip = IpUtil.getIpAddr(request);
        QueryWrapper<LoginCount> wrapper = new QueryWrapper<>();
        wrapper.eq("ip", ip);
        int count = loginCountService.count(wrapper);
        System.out.println(count);
        if( "".equals(user.getName()) || "".equals(user.getPassword())){
            model.addAttribute("msg","用户名或密码不能为空！");
            return "login";
        }else if (userdata == null){
            model.addAttribute("msg","用户名或密码错误！");
            return "login";
        }else if(count >= 5 && "admin".equalsIgnoreCase(user.getName())){
            model.addAttribute("msg","您访问本网站次数已超，被禁止访问！");
            return "login";
        }else{
            session.setAttribute("loginUser",user);

            //获取浏览器名称
            String browserName = IpUtil.browserName(request);
            //获取操作系统名称
            String osName = IpUtil.osName(request);

            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String time = formatter.format(date);
            //时间
            LoginCount loginCount = new LoginCount();
            loginCount.setIp(ip);
            loginCount.setBrowserName(browserName);
            loginCount.setOsName(osName);
            loginCount.setTime(time);
            loginCount.setLoginuser(user.getName());
            try {
                String[] str  = IpUtil.getCityInfo(ip);
                //获取数字地址
                loginCount.setNumericAddress(str[3]);
                //获取ip所在地
                loginCount.setAddress(str[5].substring(0,str[5].indexOf(" ip138提供")));
                emailService.sendSimpleMail("1730509384@qq.com", "登录国内疫情可视化平台通知", "登录用户："+ user.getName() + "<br>"+"登录时间："+ time + "<br>"+ "登录IP："+ip+ "<br>"+ "登录地址：" + str[5].substring(0,str[5].indexOf(" ip138提供")));
            } catch (IOException e) {
                e.printStackTrace();
            }
        //保存
            loginCountService.save(loginCount);

            return "redirect:/index.html";

        }

    }

    @GetMapping(value = {"main.html"})
    public String mainPage(Model model){
        //风险地区数据
        List<RiskAreas> riskAreasList = riskAreasService.list();
        model.addAttribute("riskAreas",riskAreasList);
        //中国感染的数量（累计，现存，死亡，治愈）
        QueryWrapper<ChinaTotal> queryWrapper=new QueryWrapper();
        queryWrapper.select("confirm", "nowConfirm","importedCase","dead");
        queryWrapper.orderByDesc("nowtime").last("limit 1");
        ChinaTotal chinaTotal = chinaTotalService.getOne(queryWrapper);
        model.addAttribute("chinaTotal",chinaTotal);
        //感染的死亡率
        Long confirm = chinaTotal.getConfirm();
        Long dead = chinaTotal.getDead();
        double deadHeal1 = dead / confirm.doubleValue()*100;
        String  str = String.format("%.2f",deadHeal1);
        double deadHeal = Double.parseDouble(str);
        model.addAttribute("deadHeal",deadHeal);
        return "main";
    }


    @GetMapping(value = {"index.html"})
    public String indexPage(){

        return "index";
    }
}
