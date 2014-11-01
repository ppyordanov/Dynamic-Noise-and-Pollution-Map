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

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("/")
public class HomeController {


    private static final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);
    private DeviceService deviceService;
    private DataReadingService dataReadingService;
    private @Autowired ServletContext servletContext;

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
    public String printWelcome(ModelMap model, HttpServletRequest request) {
        model.addAttribute("message", "Hello world!");
        String path = request.getContextPath();

        Device device = new Device("title", "desc", "1.1", "mac");
        if(device.getId() == null){
            //new device
            this.deviceService.addDevice(device);
        }else{
            //existing device, update
            this.deviceService.updateDevice(device);
        }

        /*
        java.util.Date d= new java.util.Date();

        DataReading dr = new DataReading(1, 1, new Timestamp(d.getTime()), 99.99, 99.99, 99.99, 99.99, 99.99, 99.99);
        if(dr.getId() == null){
            //new dr, add
            this.dataReadingService.addDataReading(dr);
        }else{
            //existing dr, update
            this.dataReadingService.updateDataReading(dr);
        }

        */

        //DB POPULATION

        ArrayList<DataReading> dataReadings = loadModels("/resources/SAMPLE_DATA/sample_data.json");

        long startTime = System.currentTimeMillis();

        for(int i=1;i<=2;i++){

            for(DataReading dataReading: dataReadings){
                dataReading.setDevice_id(i);
                dataReading.setRoute_id(i);
                this.dataReadingService.addDataReading(dataReading);

            }

        }

        long endTime = System.currentTimeMillis();
        long insertionDuration = endTime - startTime;

        String result = String.format("%d min, %d sec",
                TimeUnit.MILLISECONDS.toMinutes(insertionDuration),
                TimeUnit.MILLISECONDS.toSeconds(insertionDuration) -
                        TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(insertionDuration))
        );

        System.out.println(result);

        return "home";
    }

    private ArrayList<DataReading> loadModels(String resource){

        InputStream reader = null;
        Object[] readings = null;
        Map<String, Object> map = null;
        Map<String, Object> reading = null;
        ArrayList<DataReading> dataReadings = new ArrayList<DataReading>();

        DataReading dataReading = null;

        Integer route_id= null, device_id= null;
        Timestamp timestamp;
        Double latitude=0.0, longitude=0.0, noise, co, no2, battery;


        reader = servletContext.getResourceAsStream(resource);
        map = new Genson().deserialize(reader, Map.class);
        readings = (Object[])map.get("data");

        System.out.println("Readings loaded from file: " + readings.length);


        for(Object o: readings){

            reading = (Map<String, Object>) o;

            timestamp = Timestamp.valueOf((String)reading.get("timestamp"));

            noise = Double.parseDouble(reading.get("noise").toString());
            co = Double.parseDouble(reading.get("co").toString());
            no2 = Double.parseDouble(reading.get("no2").toString());
            battery = Double.parseDouble(reading.get("bat").toString());

            //co = Double.valueOf(reading.get("co"));
            //no2 = Double.valueOf(reading.get("no2"));
            //battery = Double.valueOf(reading.get("bat"));

            dataReading = new DataReading(route_id, device_id, timestamp, latitude, longitude, noise, co, no2, battery);

            dataReadings.add(dataReading);


        }
        System.out.println(dataReadings.size());
        return dataReadings;

    }



}