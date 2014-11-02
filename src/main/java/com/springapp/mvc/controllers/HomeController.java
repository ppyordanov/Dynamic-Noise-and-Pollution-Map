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
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/")
public class HomeController {

    private DeviceService deviceService;
    private DataReadingService dataReadingService;
    private
    @Autowired
    ServletContext servletContext;

    private DataPopulation dataPopulation = new DataPopulation();


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


        return "home";
    }

    @RequestMapping(value = "/data")
    public String dataPopulation(ModelMap model) {


        InputStream JSONresource = servletContext.getResourceAsStream("/resources/SAMPLE_DATA/sample_data.json");
        ArrayList<DataReading> dataReadings = dataPopulation.loadModels(JSONresource);

        int SIZE = 40;

        long startTime = System.currentTimeMillis();

        String insertSingleBenchmarkResult = insertSingleBenchmark();
        String insertRealDataBenchmarkResult = insertRealDataBenchmark(dataReadings, SIZE);
        String getSingleBenchmarkResult = getSingleBenchmark();
        String updateSingleBenchmarkResult = updateSingleBenchmark();
        String deleteSingleBenchmarkResult = deleteSingleBenchmark();

        String getAllBenchmarkResult = getAllBenchmark();

        long endTime = System.currentTimeMillis();

        String totalTime = dataPopulation.taskDuration(startTime, endTime);

        model.addAttribute("dataReadings", dataReadings);

        model.addAttribute("insertSingle", insertSingleBenchmarkResult);
        model.addAttribute("insertRealData", insertRealDataBenchmarkResult);
        model.addAttribute("getAll", getAllBenchmarkResult);
        model.addAttribute("getSingle", getSingleBenchmarkResult);
        model.addAttribute("deleteSingle", deleteSingleBenchmarkResult);

        model.addAttribute("updateSingle", updateSingleBenchmarkResult);
        model.addAttribute("realDataSize", SIZE);
        model.addAttribute("totalTime", totalTime);


        return "data";
    }

    // records is the insertion amount 1 corresponds to 5 000 insertions of data
    private String insertRealDataBenchmark(ArrayList<DataReading> dataReadings, int records) {
        long startTime = System.currentTimeMillis();


        for (int i = 0; i < records; i++) {
            for (DataReading dataReading : dataReadings) {

                if (dataReading.getId() != null) {
                    dataReading.setId(null);
                }
                this.dataReadingService.addDataReading(dataReading);

            }
        }

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;

    }

    private String updateSingleBenchmark(){

        long startTime = System.currentTimeMillis();
        java.util.Date d = new java.util.Date();
        DataReading dataReading = new DataReading(1, 1, new Timestamp(d.getTime()), 0.0, 99.99, 99.99, 99.99, 99.99, 99.99);
        dataReading.setId(1);
        this.dataReadingService.updateDataReading(dataReading);

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    public String getAllBenchmark(){
        long startTime = System.currentTimeMillis();

        List<DataReading> dataReadings = this.dataReadingService.getAll();

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    public String getSingleBenchmark(){
        long startTime = System.currentTimeMillis();

        DataReading dataReading = this.dataReadingService.getDataReading(1);

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    public String deleteSingleBenchmark(){
        long startTime = System.currentTimeMillis();

        this.dataReadingService.deleteDataReading(1);

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    private String insertSingleBenchmark() {

        Device device = new Device("title", "desc", "1.1", "mac");
        java.util.Date d = new java.util.Date();
        DataReading dr = new DataReading(1, 1, new Timestamp(d.getTime()), 99.99, 99.99, 99.99, 99.99, 99.99, 99.99);

        long startTime = System.currentTimeMillis();

        this.deviceService.addDevice(device);
        this.dataReadingService.addDataReading(dr);

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);


        return "Single insert in tables DEVICE and DATA_READING: " + executionTimeResult;


    }

}