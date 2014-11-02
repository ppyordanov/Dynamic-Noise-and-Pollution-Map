package com.springapp.mvc.services;

import com.springapp.mvc.daos.DataReadingDAO;
import com.springapp.mvc.models.DataReading;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

@Service
public class DataReadingServiceImpl implements DataReadingService {


    private DataReadingDAO dataReadingDAO;

    public void setDataReadingDAO(DataReadingDAO dataReadingDAO) {
        this.dataReadingDAO = dataReadingDAO;
    }

    @Override
    @Transactional
    public void addDataReading(DataReading dr) {
        this.dataReadingDAO.addDataReading(dr);
    }

    @Override
    public void updateDataReading(DataReading dr) {
        this.dataReadingDAO.updateDataReading(dr);
    }


    @Override
    public List<DataReading> getAll() {
        return this.dataReadingDAO.getAll();
    }

    @Override
    public DataReading getDataReading(Integer id) {
        return this.dataReadingDAO.getDataReading(id);
    }

    @Override
    public void deleteDataReading(Integer id) {
        this.dataReadingDAO.deleteDataReading(id);
    }
}
