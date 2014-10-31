package com.springapp.mvc.controllers;

import com.owlike.genson.Genson;
import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import com.springapp.mvc.services.DataReadingService;
import com.springapp.mvc.services.DeviceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Timestamp;
import java.util.Map;

@Controller
@RequestMapping("/")
public class HomeController {


    private static final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);
    private DeviceService deviceService;
    private DataReadingService dataReadingService;

    @Autowired(required=true)
    @Qualifier(value="deviceService")
    public void setDeviceService(DeviceService deviceService){
        this.deviceService = deviceService;
    }

    @Autowired(required=true)
    @Qualifier(value="dataReadingService")
    public void setDataReadingService(DataReadingService dataReadingService){
        this.dataReadingService = dataReadingService;
    }





    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {
        model.addAttribute("message", "Hello world!");

        Device device = new Device("title", "desc", "1.1", "mac");
        if(device.getId() == null){
            //new person, add it
            this.deviceService.addDevice(device);
        }else{
            //existing person, call update
            this.deviceService.updateDevice(device);
        }

        java.util.Date d= new java.util.Date();

        DataReading dr = new DataReading(1, 1, new Timestamp(d.getTime()), 99.99, 99.99, 99.99, 99.99, 99.99, 99.99);
        if(dr.getId() == null){
            //new person, add it
            this.dataReadingService.addDataReading(dr);
        }else{
            //existing person, call update
            this.dataReadingService.updateDataReading(dr);
        }

        //DB POPULATION

        FileReader reader = null;
        try {
            reader = new FileReader("C:\\Users\\Peter Yordanov\\Desktop\\Ppyordanov's files\\Glasgow Uni Files 2014-15 lvl4\\Personal_Project_4\\Dynamic-Noise-and-Pollution-Map\\GEN\\SAMPLE_DATA\\sample_data.json");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            LOGGER.info("NO JSON");
        }
        Map<String, Object> map = new Genson().deserialize(reader, Map.class);

        System.out.println("Readings: " + map.size() );

        return "home";
    }

}