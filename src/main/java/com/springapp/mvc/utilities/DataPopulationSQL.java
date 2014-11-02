package com.springapp.mvc.utilities;

import com.owlike.genson.Genson;
import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.services.DataReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import javax.servlet.ServletContext;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Peter Yordanov on 1.11.2014 г..
 */
public class DataPopulationSQL {

    private DataReadingService dataReadingService;
    private
    @Autowired
    ServletContext servletContext;

    private Double minLatBounds = 55.870056;
    private Double maxLatBounds = 55.875209;
    private Double minLonBounds = -4.278797;
    private Double maxLonBounds = -4.297637;

    @Autowired(required = true)
    @Qualifier(value = "dataReadingService")
    public void setDataReadingService(DataReadingService dataReadingService) {
        this.dataReadingService = dataReadingService;
    }


    private void main(String[] args){

        ArrayList<DataReading> dataReadings = loadModels("/resources/SAMPLE_DATA/sample_data.json");

        long startTime = System.currentTimeMillis();


        for (int i = 0; i < 1; i++) {
            for (DataReading dataReading : dataReadings) {

                if(dataReading.getId() != null){
                    dataReading.setId(null);
                }
                this.dataReadingService.addDataReading(dataReading);

            }
        }

        long endTime = System.currentTimeMillis();

        System.out.println(taskDuration(startTime, endTime));

    }


    //function to format execution time milliseconds => min, sec, millisec
    private String taskDuration(long startTime, long endTime){

        long insertionDuration = endTime - startTime;


        long minutes =  TimeUnit.MILLISECONDS.toMinutes(insertionDuration);
        long seconds = TimeUnit.MILLISECONDS.toSeconds(insertionDuration) - TimeUnit.MINUTES.toSeconds(minutes);
        long milliseconds = insertionDuration - TimeUnit.SECONDS.toMillis(seconds);


        String result = String.format("Execution time: %d min, %d sec, %d millisec",
                minutes,
                seconds,
                milliseconds
        );

        return result;

    }

    //v2 translated from map.js
    private HashMap<String, Double> randomPosGen(Double minLatBounds, Double maxLatBounds, Double minLonBounds, Double maxLonBounds) {

        HashMap<String, Double> position = new HashMap<String, Double>();

        Integer multiplier = 1000000;
        Double lat = Math.random() * ((maxLatBounds - minLatBounds) * multiplier) + minLatBounds * multiplier;
        Double lon = Math.random() * ((maxLonBounds - minLonBounds) * multiplier) + minLonBounds * multiplier;

        position.put("latitude", lat / multiplier);
        position.put("longitude", lon / multiplier);


        return position;

    }

    private ArrayList<DataReading> loadModels(String resource) {

        InputStream reader = null;
        Object[] readings = null;
        Map<String, Object> map = null;
        Map<String, Object> reading = null;
        Map<String, Double> position = null;
        ArrayList<DataReading> dataReadings = new ArrayList<DataReading>();

        DataReading dataReading = null;

        Integer route_id = null, device_id = null;
        Timestamp timestamp;
        Double latitude = null, longitude = null, noise, co, no2, battery;


        reader = servletContext.getResourceAsStream(resource);
        map = new Genson().deserialize(reader, Map.class);
        readings = (Object[]) map.get("data");

        System.out.println("Readings loaded from file: " + readings.length);


        for (Object o : readings) {

            reading = (Map<String, Object>) o;

            timestamp = Timestamp.valueOf((String) reading.get("timestamp"));

            noise = Double.parseDouble(reading.get("noise").toString());
            co = Double.parseDouble(reading.get("co").toString());
            no2 = Double.parseDouble(reading.get("no2").toString());
            battery = Double.parseDouble(reading.get("bat").toString());

            position = randomPosGen(minLatBounds, maxLatBounds, minLonBounds, maxLonBounds);

            latitude = position.get("latitude");
            longitude = position.get("longitude");

            dataReading = new DataReading(route_id, device_id, timestamp, latitude, longitude, noise, co, no2, battery);


            dataReadings.add(dataReading);


        }
        System.out.println(dataReadings.size());
        return dataReadings;

    }

}
