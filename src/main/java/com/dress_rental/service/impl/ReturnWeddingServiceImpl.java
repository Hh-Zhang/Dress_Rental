package com.dress_rental.service.impl;
import com.dress_rental.dao.ReturnWeddingDao;
import com.dress_rental.entities.ReturnWedding;
import com.dress_rental.service.ReturnWeddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;


@Service
public class ReturnWeddingServiceImpl implements ReturnWeddingService {
	@Autowired
	
	private ReturnWeddingDao returnWeddingDao;


	public List<Map<String, Object>> qrylistbakwedding(Map<String,Object> map) {
		try{
			return returnWeddingDao.qrylistbakwedding(map);
	}catch(Exception e){
		throw new RuntimeException(e);
	}
	}

	public int addBackwedding(ReturnWedding wed) {
		return returnWeddingDao.addBackwedding(wed);
	}


	public Integer upBackwedding(ReturnWedding wed) {
		return returnWeddingDao.upBackwedding(wed);
	}

	public int removeBackWeddingInfoByIds(List<Integer> list) {
		return returnWeddingDao.removeBackWeddingInfoByIds(list);
	}

}
