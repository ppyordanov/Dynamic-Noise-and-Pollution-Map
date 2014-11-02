package com.springapp.mvc.utilities;

import com.owlike.genson.Genson;
import com.springapp.mvc.models.DataReading;

import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Peter Yordanov on 1.11.2014 г..
 */
public class DataPopulation {


    //function to format execution time milliseconds => min, sec, millisec
    public String taskDuration(long startTime, long endTime) {

        long insertionDuration = endTime - startTime;


        long minutes = TimeUnit.MILLISECONDS.toMinutes(insertionDuration);
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
    public HashMap<String, Double> randomPosGen(Double minLatBounds, Double maxLatBounds, Double minLonBounds, Double maxLonBounds) {

        HashMap<String, Double> position = new HashMap<String, Double>();

        Integer multiplier = 1000000;
        Double lat = Math.random() * ((maxLatBounds - minLatBounds) * multiplier) + minLatBounds * multiplier;
        Double lon = Math.random() * ((maxLonBounds - minLonBounds) * multiplier) + minLonBounds * multiplier;

        position.put("latitude", lat / multiplier);
        position.put("longitude", lon / multiplier);


        return position;

    }

    public ArrayList<DataReading> loadModels(InputStream JSONresource) {

        Object[] readings = null;
        Map<String, Object> map = null;
        Map<String, Object> reading = null;
        Map<String, Double> position = null;
        ArrayList<DataReading> dataReadings = new ArrayList<DataReading>();

        DataReading dataReading = null;

        Integer route_id = null, device_id = null;
        Timestamp timestamp;
        Double latitude = null, longitude = null, noise, co, no2, battery;


        map = new Genson().deserialize(JSONresource, Map.class);
        readings = (Object[]) map.get("data");

        System.out.println("Readings loaded from file: " + readings.length);


        for (Object o : readings) {

            reading = (Map<String, Object>) o;

            timestamp = Timestamp.valueOf((String) reading.get("timestamp"));

            noise = Double.parseDouble(reading.get("noise").toString());
            co = Double.parseDouble(reading.get("co").toString());
            no2 = Double.parseDouble(reading.get("no2").toString());
            battery = Double.parseDouble(reading.get("bat").toString());

            position = randomPosGen(Constants.MIN_LAT_BOUNDS, Constants.MAX_LAT_BOUNDS, Constants.MIN_LON_BOUNDS, Constants.MAX_LON_BOUNDS);

            latitude = position.get("latitude");
            longitude = position.get("longitude");

            dataReading = new DataReading(route_id, device_id, timestamp, latitude, longitude, noise, co, no2, battery);


            dataReadings.add(dataReading);


        }
        System.out.println(dataReadings.size());
        return dataReadings;

    }

}
