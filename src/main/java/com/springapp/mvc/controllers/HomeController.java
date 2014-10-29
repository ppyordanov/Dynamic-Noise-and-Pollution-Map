package com.springapp.mvc.controllers;

import com.springapp.mvc.models.Device;
import com.springapp.mvc.services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HomeController {


    private DeviceService deviceService;

    @Autowired(required=true)
    @Qualifier(value="deviceService")
    public void setDeviceService(DeviceService deviceService){
        this.deviceService = deviceService;
    }




    @RequestMapping(value= "/person/add", method = RequestMethod.POST)
    public String addPerson(){



        Device device = new Device("title", "desc", "1.1", "mac");
        if(device.getId() == null){
            //new person, add it
            this.deviceService.addDevice(device);
        }else{
            //existing person, call update
            this.deviceService.updateDevice(device);
        }

        return "redirect:/persons";

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

        return "home";
    }

}