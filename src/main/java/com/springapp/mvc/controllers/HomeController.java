package com.springapp.mvc.controllers;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import com.springapp.mvc.services.DataReadingService;
import com.springapp.mvc.services.DeviceService;
import com.springapp.mvc.utilities.DataPopulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletContext;
import java.sql.Timestamp;
import java.util.ArrayList;

@Controller
@RequestMapping("/")
public class HomeController {

    private DeviceService deviceService;
    private DataReadingService dataReadingService;
    private
    @Autowired
    ServletContext servletContext;


    @Autowired(required = true)
    @Qualifier(value = "deviceService")
    public void setDeviceService(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @Autowired(required = true)
    @Qualifier(value = "dataReadingService")
    public void setDataReadingService(DataReadingService dataReadingService) {
        this.dataReadingService = dataReadingService;
    }


    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {

        model.addAttribute("message", "Hello world!");

        Device device = new Device("title", "desc", "1.1", "mac");
        if (device.getId() == null) {
            //new device
            this.deviceService.addDevice(device);
        } else {
            //existing device, update
            this.deviceService.updateDevice(device);
        }


        java.util.Date d = new java.util.Date();

        DataReading dr = new DataReading(1, 1, new Timestamp(d.getTime()), 99.99, 99.99, 99.99, 99.99, 99.99, 99.99);
        if (dr.getId() == null) {
            //new dr, add
            this.dataReadingService.addDataReading(dr);
        } else {
            //existing dr, update
            this.dataReadingService.updateDataReading(dr);
        }


        DataPopulation dataPopulation = new DataPopulation();
        ArrayList<DataReading> dataReadings = dataPopulation.loadModels("/resources/SAMPLE_DATA/sample_data.json");

        long startTime = System.currentTimeMillis();


        for (int i = 0; i < 1; i++) {
            for (DataReading dataReading : dataReadings) {

                if (dataReading.getId() != null) {
                    dataReading.setId(null);
                }
                this.dataReadingService.addDataReading(dataReading);

            }
        }

        long endTime = System.currentTimeMillis();

        System.out.println(dataPopulation.taskDuration(startTime, endTime));


        return "home";
    }

}