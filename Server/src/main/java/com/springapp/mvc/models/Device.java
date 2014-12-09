package com.springapp.mvc.models;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by Peter Yordanov on 19.10.2014 г..
 */

@Document(collection = "Devices")
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

        StringBuilder string = new StringBuilder();
        String newLine = System.getProperty("line.separator");

        string.append(this.getClass().getName() + " Object {" + newLine);
        string.append("id: " + id + newLine);
        string.append("title: " + title + newLine);
        string.append("description: " + description + newLine);
        string.append("kitVersion: " + kitVersion + newLine);
        string.append("macAddress: " + macAddress + newLine);

        return string.toString();

    }
}
