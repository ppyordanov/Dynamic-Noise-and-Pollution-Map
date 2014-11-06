package com.springapp.mvc.controllers;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import com.springapp.mvc.repositories.DataReadingRepository;
import com.springapp.mvc.repositories.DeviceRepository;
import com.springapp.mvc.repositories.RouteRepository;
import com.springapp.mvc.utilities.DataPopulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletContext;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired(required = true)
    private DataReadingRepository dataReadingRepository;
    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired(required = true)
    private RouteRepository routeRepository;
    @Autowired(required = true)
    private DeviceRepository deviceRepository;
    //private DataReadingRepository dataReadingService;
    private
    @Autowired
    ServletContext servletContext;

    private DataPopulation dataPopulation = new DataPopulation();





    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {

        model.addAttribute("message", "Hello world!");


        return "home";
    }

    @RequestMapping(value = "/data")
    public String dataPopulation(ModelMap model) {


        InputStream JSONresource = servletContext.getResourceAsStream("/resources/SAMPLE_DATA/sample_data.json");
        ArrayList<DataReading> dataReadings = dataPopulation.loadModels(JSONresource);

        routeRepository.deleteAll();
        deviceRepository.deleteAll();
        dataReadingRepository.deleteAll();


        System.out.println("LOADED DATA RECORDS: " + dataReadings.size());


        int SIZE = 1000;

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
        model.addAttribute("updateSingle", updateSingleBenchmarkResult);
        model.addAttribute("getSingle", getSingleBenchmarkResult);
        model.addAttribute("deleteSingle", deleteSingleBenchmarkResult);

        model.addAttribute("getAll", getAllBenchmarkResult);
        model.addAttribute("realDataSize", SIZE);
        model.addAttribute("totalTime", totalTime);


        return "data";
    }

    // records is the insertion amount 1 corresponds to 5 000 insertions of data
    private String insertRealDataBenchmark(ArrayList<DataReading> dataReadings, int records) {

        long startTime = System.currentTimeMillis();


        for (int i = 0; i < records; i++) {
            for (DataReading dataReading : dataReadings) {

                if(dataReading.getId() !=null){
                    dataReading.setId(null);
                }
                dataReadingRepository.save(dataReading);

            }
        }

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;

    }

    private String updateSingleBenchmark() {

        long startTime = System.currentTimeMillis();

        Query query = new Query(where("battery").is(100));
        mongoTemplate.updateFirst(query, Update.update("noise",999),DataReading.class);

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    public String getAllBenchmark() {
        long startTime = System.currentTimeMillis();

        List<DataReading> dataReadings = dataReadingRepository.findAll();

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    public String getSingleBenchmark() {
        long startTime = System.currentTimeMillis();

        DataReading dataReading = dataReadingRepository.findByBattery(66.3);


        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    public String deleteSingleBenchmark() {
        long startTime = System.currentTimeMillis();

        dataReadingRepository.delete(dataReadingRepository.findByBattery(66.2));

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    private String insertSingleBenchmark() {


        long startTime = System.currentTimeMillis();

        deviceRepository.save(new Device("horse", "horse", "horse", "horse"));

        long endTime = System.currentTimeMillis();

        String executionTimeResult = dataPopulation.taskDuration(startTime, endTime);


        return "Single insert in collections: " + executionTimeResult;


    }


}