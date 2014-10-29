package com.springapp.mvc.daos;

import com.springapp.mvc.models.DataReading;

import java.util.List;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */



public interface DataReadingDAO {

    public void addDataReading(DataReading dr);
    public void updateDataReading(DataReading dr);
    public List<DataReading> getAll();
    public DataReading getDataReading(Integer id);
    public void deleteDataReading(Integer id);

}
