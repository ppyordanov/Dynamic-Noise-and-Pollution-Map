package com.springapp.mvc.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;

/**
 * Created by Peter Yordanov on 14.10.2014 г..
 */

@Document(collection = "DataReadings")
public class DataReading {

    @Id
    private String id;
    private String routeId;
    private String deviceId;

    private Timestamp timestamp;
    private Double latitude;
    private Double longitude;
    private Double noise;
    private Double co;
    private Double no2;
    private Double battery;

    /*

    private Double humidity;
    private Double temperature;
    private Double light;
    private Double panel;
    private Double nets;

    */

    //default constructor
    public DataReading() {

        super();
        this.id = null;
        this.routeId = null;
        this.deviceId = null;
        this.timestamp = null;
        this.latitude = null;
        this.longitude = null;
        this.noise = null;
        this.co = null;
        this.no2 = null;
        this.battery = null;

    }

    //parameterized constructor
    public DataReading(String routeId, String deviceId, Timestamp timestamp, Double latitude, Double longitude, Double noise, Double co, Double no2, Double battery) {
        this.id = null;
        this.routeId = routeId;
        this.deviceId = deviceId;
        this.timestamp = timestamp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.noise = noise;
        this.co = co;
        this.no2 = no2;
        this.battery = battery;
    }

    //copy constructor
    public DataReading(DataReading dr) {

        this.id = null;
        this.routeId = dr.getRouteId();
        this.deviceId = dr.getDeviceId();
        this.timestamp = dr.getTimestamp();
        this.latitude = dr.getLatitude();
        this.longitude = dr.getLongitude();
        this.noise = dr.getNoise();
        this.co = dr.getCo();
        this.no2 = dr.getNo2();
        this.battery = dr.getBattery();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getNoise() {
        return noise;
    }

    public void setNoise(Double noise) {
        this.noise = noise;
    }

    public Double getCo() {
        return co;
    }

    public void setCo(Double co) {
        this.co = co;
    }

    public Double getNo2() {
        return no2;
    }

    public void setNo2(Double no2) {
        this.no2 = no2;
    }

    public Double getBattery() {
        return battery;
    }

    public void setBattery(Double battery) {
        this.battery = battery;
    }

    public String toString() {

        StringBuilder string = new StringBuilder();
        String newLine = System.getProperty("line.separator");

        string.append(this.getClass().getName() + " Object {" + newLine);
        string.append("id: " + id + newLine);
        string.append("routeId: " + routeId + newLine);
        string.append("deviceId: " + deviceId + newLine);
        string.append("timestamp: " + timestamp + newLine);
        string.append("latitude: " + latitude + newLine);
        string.append("longitude: " + longitude + newLine);
        string.append("noise: " + noise + newLine);
        string.append("co: " + co  + newLine);
        string.append("no2: " + no2 + newLine);
        string.append("battery: " + battery + newLine);

        return string.toString();

    }

}
