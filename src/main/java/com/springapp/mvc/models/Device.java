package com.springapp.mvc.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Peter Yordanov on 19.10.2014 г..
 */
@Entity
@Table(name="DEVICE")
public class Device {

    @Id
    @Column(name="deviceID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String kit_version;
    private String mac_address;

    //default constructor
    public Device(){

        super();
        this.id  = null;
        this.title = null;
        this.description = null;
        this.kit_version = null;
        this.mac_address = null;

    }

    //parameterized constructor
    public Device(String title, String description, String kit_version, String mac_address){
        this.id = null;
        this.title = title;
        this.description = description;
        this.kit_version = kit_version;
        this.mac_address = mac_address;
    }

    //copy constructor
    public Device(Device d){
        this.id = null;
        this.title = d.getTitle();
        this.description = d.getDescription();
        this.kit_version = d.getKit_version();
        this.mac_address = d.getMac_address();
    }

    public String getMac_address() {
        return mac_address;
    }

    public void setMac_address(String mac_address) {
        this.mac_address = mac_address;
    }

    public String getKit_version() {
        return kit_version;
    }

    public void setKit_version(String kit_version) {
        this.kit_version = kit_version;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
    public String toString(){
        return null;
    }
}
