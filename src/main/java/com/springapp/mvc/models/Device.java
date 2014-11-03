package com.springapp.mvc.models;

import javax.persistence.*;

/**
 * Created by Peter Yordanov on 19.10.2014 г..
 */

public class Device {

    @Id
    private String id;
    private String title;
    private String description;
    private String kitVersion;
    private String macAddress;

    //default constructor
    public Device() {

        super();
        this.id = null;
        this.title = null;
        this.description = null;
        this.kitVersion = null;
        this.macAddress = null;

    }

    //parameterized constructor
    public Device(String title, String description, String kitVersion, String macAddress) {
        this.id = null;
        this.title = title;
        this.description = description;
        this.kitVersion = kitVersion;
        this.macAddress = macAddress;
    }

    //copy constructor
    public Device(Device d) {
        this.id = null;
        this.title = d.getTitle();
        this.description = d.getDescription();
        this.kitVersion = d.getKitVersion();
        this.macAddress = d.getMacAddress();
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getKitVersion() {
        return kitVersion;
    }

    public void setKitVersion(String kitVersion) {
        this.kitVersion = kitVersion;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.title;
    }
}
