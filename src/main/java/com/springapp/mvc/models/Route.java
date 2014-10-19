package com.springapp.mvc.models;

/**
 * Created by Peter Yordanov on 14.10.2014 г..
 */
public class Route {

    private Integer id;
    private Integer device_id;

    //default constructor
    public Route(){

        super();
        this.id  = null;
        this.device_id = null;

    }

    //parameterized constructor
    public Route(Integer device_id){
        this.id = null;
        this.device_id = device_id;
    }

    //copy constructor
    public Route(Route r){
        this.id = null;
        this.device_id = r.getDevice_id();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDevice_id() {
        return device_id;
    }

    public void setDevice_id(Integer device_id) {
        this.device_id = device_id;
    }

    public String toString(){
        return null;
    }

}
