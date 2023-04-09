package com.xiao.covids.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiao.covids.entity.*;
import com.xiao.covids.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xiao
 * @Description:后台所有表格相关
 * @create 2022-06-05 20:50
 */
@Controller
public class TableController {

    @Autowired
    private AreaWithVariousDataService areaWithVariousDataService;

    @Autowired
    private RiskAreasService riskAreasService;
    @Autowired
    private RiskAreasTodayService riskAreasTodayService;
    @Autowired
    private ChinaTotalService chinaTotalService;
    @Autowired
    private ChinaTwomonthsService chinaTwomonthsService;
    @Autowired
    private ChinaTwomonthsAddService chinaTwomonthsAddService;
    @Autowired
    private AreaThedayService areaThedayService;
    @Autowired
    private AreaHistoryConfirmService areaHistoryConfirmService;
    @Autowired
    private AreaHistoryConfirmAddService areaHistoryConfirmAddService;
    @Autowired
    private QqNewsService qqNewsService;
    @Autowired
    private UserService userService;
    @Autowired
    private LoginCountService loginCountService;
    @Autowired
    private NewsService newsService;


    @GetMapping(value = {"/index"})
    public String index_page(HttpSession session){

        return "admin/index";
    }

    @GetMapping(value = {"/home"})
    public String home_page(Model model){

        //中国感染的数量（累计，现存，死亡，治愈）
        QueryWrapper<ChinaTotal> queryWrapper=new QueryWrapper();
        queryWrapper.select("confirm", "nowConfirm","importedCase","dead");
        queryWrapper.orderByDesc("nowtime").last("limit 1");
        ChinaTotal chinaTotal = chinaTotalService.getOne(queryWrapper);
        model.addAttribute("chinaTotal",chinaTotal);
        QueryWrapper<QqNews> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.last("ORDER BY publish_time DESC limit 5");
//        Page<News> newsListPage = new Page<>(pn,12);

        List<QqNews> newsList = qqNewsService.list(queryWrapper1);
        model.addAttribute("newsList",newsList);

        return "admin/home";
    }

    @RequestMapping(value = {"/user_list.html"})
    public String user_list_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        Page<AreaWithVariousData> areaWithVariousDataListPage = new Page<>(pn,10);

        Page<AreaWithVariousData> page = areaWithVariousDataService.page(areaWithVariousDataListPage,null);
        model.addAttribute("areaWithVariousDataPage",page);
        return "admin/list";
    }

    @RequestMapping(value = {"/user.html"})
    public String user_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        Page<User> userPage = new Page<>(pn,10);

        Page<User> page = userService.page(userPage,null);
        model.addAttribute("pages",page);
        return "admin/user";
    }

    @RequestMapping(value = {"/login_user.html"})
    public String login_user_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<LoginCount> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("time");
        Page<LoginCount> loginUserListPage = new Page<>(pn,10);

        Page<LoginCount> page = loginCountService.page(loginUserListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/login_user";
    }


    @GetMapping("/user_list.html/delete/{areaname}")
    public String deleteAreaWithVariousData(@PathVariable("areaname")String areaname,
                                            @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                            RedirectAttributes redirectAttributes){
        QueryWrapper<AreaWithVariousData> wrapper = new QueryWrapper<>();
        wrapper.eq("areaname", areaname);
        areaWithVariousDataService.remove(wrapper);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/user_list.html";
    }

    @PostMapping("/areaWithVariousData/update")
    public String updateAreaWithVariousData(@RequestBody AreaWithVariousData areaWithVariousData){

        UpdateWrapper<AreaWithVariousData> wrapper = new UpdateWrapper<>();

        wrapper.eq("areaname",areaWithVariousData.getAreaname());
        areaWithVariousDataService.update(areaWithVariousData,wrapper);

        return "redirect:/user_list.html";
    }

    @PostMapping("/areaWithVariousData/add")
    @ResponseBody
    public ResponseEntity<?> addAreaWithVariousData(@RequestBody AreaWithVariousData areaWithVariousData){

        Map<String, String> map = new HashMap<String, String>();
        QueryWrapper<AreaWithVariousData> wrapper = new QueryWrapper<>();
        wrapper.eq("areaname", areaWithVariousData.getAreaname());

        AreaWithVariousData one = areaWithVariousDataService.getOne(wrapper);
        if (one != null){
            map.put("msg", "添加失败！该城市【"+areaWithVariousData.getAreaname()+"】名称已存在");
            map.put("code", "500");
            return ResponseEntity.ok(map);
        }
        map.put("msg", "添加成功");
        map.put("code", "200");
        areaWithVariousDataService.save(areaWithVariousData);
        return ResponseEntity.ok(map);
    }

    @RequestMapping(value = {"/risk_areaslist.html"})
    public String risk_areaslist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){
        Page<RiskAreas> riskAreasServiceListPage = new Page<>(pn,10);
        Page<RiskAreas> page = riskAreasService.page(riskAreasServiceListPage,null);
        model.addAttribute("pages",page);
        return "admin/risk_areaslist";
    }


    @RequestMapping(value = {"/risk_areastodaylist.html"})
    public String risk_areastodaylist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){
        Page<RiskAreasToday> riskAreasTodayPage = new Page<>(pn,10);
        Page<RiskAreasToday> page = riskAreasTodayService.page(riskAreasTodayPage,null);
        model.addAttribute("pages",page);
        return "admin/risk_areastodaylist";
    }


    @GetMapping("/risk_areaslist.html/delete/{areasName}")
    public String deleteRiskAreas(@PathVariable("areasName")String areasName,
                                            @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                            RedirectAttributes redirectAttributes){
        QueryWrapper<RiskAreas> wrapper = new QueryWrapper<>();
        wrapper.eq("areas_name", areasName);
        riskAreasService.remove(wrapper);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/risk_areaslist.html";
    }


    @PostMapping("/RiskAreas/update")
    public String updateRiskAreas(@RequestBody RiskAreas riskAreas){

        UpdateWrapper<RiskAreas> wrapper = new UpdateWrapper<>();

        wrapper.eq("areas_name",riskAreas.getAreasName());
        riskAreasService.update(riskAreas,wrapper);

        return "redirect:/risk_areaslist.html";
    }

    @PostMapping("/RiskAreas/add")
    @ResponseBody
    public ResponseEntity<?> addRiskAreas(@RequestBody RiskAreas riskAreas){

        Map<String, String> map = new HashMap<String, String>();
        QueryWrapper<RiskAreas> wrapper = new QueryWrapper<>();
        wrapper.eq("areas_name", riskAreas.getAreasName());

        RiskAreas one = riskAreasService.getOne(wrapper);
        if (one != null){
            map.put("msg", "添加失败！该地区【"+riskAreas.getAreasName()+"】名称已存在");
            map.put("code", "500");
            return ResponseEntity.ok(map);
        }
        map.put("msg", "添加成功");
        map.put("code", "200");
        riskAreasService.save(riskAreas);
        return ResponseEntity.ok(map);
    }

//    @RequestMapping("/RiskAreas/select")
//    public Page<RiskAreas> selectRiskAreas(@RequestParam(value = "ids[]") String[] ids,
//                                  Model model){
//
////        UpdateWrapper<RiskAreas> wrapper = new UpdateWrapper<>();
//
//        QueryWrapper<RiskAreas> qw = new QueryWrapper<>();
//        if (ids.length == 2){
//            String areasName = ids[0];
//            String areasDegree = ids[1];
//            qw.eq("areas_name",areasName);
//            qw.eq("areas_degree",areasDegree);
//            Page<RiskAreas> riskAreasServiceListPage = new Page<>(1,5);
//            Page<RiskAreas> page = riskAreasService.page(riskAreasServiceListPage,qw);
////            model.addAttribute("pages",page);
//            return page;
//        }
//
//        qw.like("areas_name", ids[0]);
//        qw.or();
//        qw.like("areas_degree", ids[0]);
//        Page<RiskAreas> riskAreasServiceListPage = new Page<>(1,5);
//        Page<RiskAreas> page = riskAreasService.page(riskAreasServiceListPage,qw);
////        model.addAttribute("pages",page);
//        return page;
//    }


    @RequestMapping(value = {"/china_totallist.html"})
    public String china_totallist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<ChinaTotal> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("nowtime");
        Page<ChinaTotal> chinaTotalListPage = new Page<>(pn,10);

        Page<ChinaTotal> page = chinaTotalService.page(chinaTotalListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/china_totallist";
    }

    @RequestMapping(value = {"/newslist.html"})
    public String newslist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<News> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("publish_time");
        Page<News> newsListPage = new Page<>(pn,10);

        Page<News> page = newsService.page(newsListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/newslist";
    }

    @RequestMapping(value = {"/qqnewslist.html"})
    public String qqnewslist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<QqNews> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("publish_time");
        Page<QqNews> qqnewsListPage = new Page<>(pn,10);

        Page<QqNews> page = qqNewsService.page(qqnewsListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/qqnewslist";
    }

    @RequestMapping(value = {"/china_twomonthslist.html"})
    public String china_twomonthslist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<ChinaTwomonths> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("yeardate");
        Page<ChinaTwomonths> newsListPage = new Page<>(pn,10);

        Page<ChinaTwomonths> page = chinaTwomonthsService.page(newsListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/china_twomonthslist";
    }

    @RequestMapping(value = {"/china_twomonthsaddlist.html"})
    public String china_twomonthsaddlist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<ChinaTwomonthsAdd> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("yeardate");
        Page<ChinaTwomonthsAdd> newsListPage = new Page<>(pn,10);

        Page<ChinaTwomonthsAdd> page = chinaTwomonthsAddService.page(newsListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/china_twomonthsaddlist";
    }

    @RequestMapping(value = {"/area_thedaylist.html"})
    public String area_thedaylist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        Page<AreaTheday> areaTheDayListPage = new Page<>(pn,10);

        Page<AreaTheday> page = areaThedayService.page(areaTheDayListPage,null);
        model.addAttribute("pages",page);
        return "admin/area_thedaylist";
    }

    @RequestMapping(value = {"/area_history_confirmlist.html"})
    public String area_history_confirmlist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<AreaHistoryConfirm> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("yeardate");
        Page<AreaHistoryConfirm> newsListPage = new Page<>(pn,10);

        Page<AreaHistoryConfirm> page = areaHistoryConfirmService.page(newsListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/area_history_confirmlist";
    }

    @GetMapping("/area_history_confirmlist.html/delete/{yeardate}")
    public String deletarea_history_confirm(@PathVariable("yeardate")String yeardate,
                                        @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                        RedirectAttributes redirectAttributes){
        QueryWrapper<AreaHistoryConfirm> wrapper = new QueryWrapper<>();
        wrapper.eq("yeardate", yeardate);
        areaHistoryConfirmService.remove(wrapper);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/area_history_confirmlist.html";
    }
    @RequestMapping(value = {"/area_history_confirm_addlist.html"})
    public String area_history_confirm_addlist_page(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        QueryWrapper<AreaHistoryConfirmAdd> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("yeardate");
        Page<AreaHistoryConfirmAdd> newsListPage = new Page<>(pn,10);

        Page<AreaHistoryConfirmAdd> page = areaHistoryConfirmAddService.page(newsListPage,queryWrapper);
        model.addAttribute("pages",page);
        return "admin/area_history_confirm_addlist";
    }

    @GetMapping("/area_history_confirm_addlist.html/delete/{yeardate}")
    public String deletarea_history_confirm_add(@PathVariable("yeardate")String yeardate,
                                            @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                            RedirectAttributes redirectAttributes){
        QueryWrapper<AreaHistoryConfirmAdd> wrapper = new QueryWrapper<>();
        wrapper.eq("yeardate", yeardate);
        areaHistoryConfirmAddService.remove(wrapper);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/area_history_confirm_addlist.html";
    }



    @GetMapping("/area_thedaylist.html/delete/{area}")
    public String deleteAreaTheDay(@PathVariable("area")String area,
                             @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                             RedirectAttributes redirectAttributes){
        QueryWrapper<AreaTheday> wrapper = new QueryWrapper<>();
        wrapper.eq("area", area);
        areaThedayService.remove(wrapper);
        return "redirect:/area_thedaylist.html";
    }

    @GetMapping("/newslist.html/delete/{id}")
    public String deleteNews(@PathVariable("id")String id,
                                  @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                  RedirectAttributes redirectAttributes){
        newsService.removeById(id);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/newslist.html";
    }


    @GetMapping("/china_totallist.html/delete/{nowtime}")
    public String deletechina_total(@PathVariable("nowtime")String nowtime,
                             @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                             RedirectAttributes redirectAttributes){
        QueryWrapper<ChinaTotal> wrapper = new QueryWrapper<>();
        wrapper.eq("nowtime", nowtime);
        chinaTotalService.remove(wrapper);
//        chinaTotalService.removeById(id);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/china_totallist.html";
    }

    @GetMapping("/china_twomonthslist.html/delete/{yeardate}")
    public String deletechina_twomonths(@PathVariable("yeardate")String yeardate,
                                    @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                    RedirectAttributes redirectAttributes){
        QueryWrapper<ChinaTwomonths> wrapper = new QueryWrapper<>();
        wrapper.eq("yeardate", yeardate);
        chinaTwomonthsService.remove(wrapper);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/china_twomonthslist.html";
    }


    @GetMapping("/china_twomonthsaddlist.html/delete/{yeardate}")
    public String deletechina_twomonthsadd(@PathVariable("yeardate")String yeardate,
                                        @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                                        RedirectAttributes redirectAttributes){
        QueryWrapper<ChinaTwomonthsAdd> wrapper = new QueryWrapper<>();
        wrapper.eq("yeardate", yeardate);
        chinaTwomonthsAddService.remove(wrapper);
        redirectAttributes.addAttribute("pn",pn);
        return "redirect:/china_twomonthsaddlist.html";
    }




}
