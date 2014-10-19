package com.springapp.mvc.models;

import java.security.Timestamp;

/**
 * Created by Peter Yordanov on 14.10.2014 г..
 */
public class DataReading {

    private Integer id;
    private Integer route_id;
    private Integer device_id;

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
    public DataReading(){

        super();
        this.id  = null;
        this.route_id = null;
        this.device_id = null;
        this.timestamp = null;
        this.latitude = null;
        this.longitude = null;
        this.noise = null;
        this.co = null;
        this.no2 = null;
        this.battery = null;

    }

    //parameterized constructor
    public DataReading(Integer route_id, Integer device_id, Timestamp timestamp, Double latitude, Double longitude, Double noise, Double co, Double no2, Double battery){
        this.id = null;
        this.route_id  = route_id;
        this.device_id = device_id;
        this.timestamp = timestamp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.noise = noise;
        this.co = co;
        this.no2 = no2;
        this.battery = battery;
    }

    //copy constructor
    public DataReading(DataReading dr){

        this.id = null;
        this.route_id = dr.getRoute_id();
        this.device_id = dr.getDevice_id();
        this.timestamp = dr.getTimestamp();
        this.latitude = dr.getLatitude();
        this.longitude = dr.getLongitude();
        this.noise = dr.getNoise();
        this.co = dr.getCo();
        this.no2 = dr.getNo2();
        this.battery = dr.getBattery();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoute_id() {
        return route_id;
    }

    public void setRoute_id(Integer route_id) {
        this.route_id = route_id;
    }

    public Integer getDevice_id() {
        return device_id;
    }

    public void setDevice_id(Integer device_id) {
        this.device_id = device_id;
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

    public String toString(){
        return null;
    }

}
