package com.devsuperior.dsvendas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;

	@Autowired
	private SellerRepository sellerRepository;

	// toda operacao com o banco seja resolvida aqui e "ready" para não precisar
	// fazer lock no banco
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable) {
		// para a jpa armazernar os objetos em memoria e nao necessitar fazer consultas
		// adiconais para cada vendedor
		sellerRepository.findAll();

		Page<Sale> result = repository.findAll(pageable);
		return result.map(seller -> new SaleDTO(seller));
	}
}
