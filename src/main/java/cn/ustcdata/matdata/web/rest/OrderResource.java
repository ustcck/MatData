package cn.ustcdata.matdata.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.ustcdata.matdata.domain.Order;
import cn.ustcdata.matdata.repository.OrderRepository;
import cn.ustcdata.matdata.repository.search.OrderSearchRepository;
import cn.ustcdata.matdata.web.rest.errors.BadRequestAlertException;
import cn.ustcdata.matdata.web.rest.util.HeaderUtil;
import cn.ustcdata.matdata.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Order.
 */
@RestController
@RequestMapping("/api")
public class OrderResource {

    private final Logger log = LoggerFactory.getLogger(OrderResource.class);

    private static final String ENTITY_NAME = "order";

    private final OrderRepository orderRepository;

    private final OrderSearchRepository orderSearchRepository;

    public OrderResource(OrderRepository orderRepository, OrderSearchRepository orderSearchRepository) {
        this.orderRepository = orderRepository;
        this.orderSearchRepository = orderSearchRepository;
    }

    /**
     * POST  /orders : Create a new order.
     *
     * @param order the order to create
     * @return the ResponseEntity with status 201 (Created) and with body the new order, or with status 400 (Bad Request) if the order has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orders")
    @Timed
    public ResponseEntity<Order> createOrder(@RequestBody Order order) throws URISyntaxException {
        log.debug("REST request to save Order : {}", order);
        if (order.getId() != null) {
            throw new BadRequestAlertException("A new order cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Order result = orderRepository.save(order);
        orderSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /orders : Updates an existing order.
     *
     * @param order the order to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated order,
     * or with status 400 (Bad Request) if the order is not valid,
     * or with status 500 (Internal Server Error) if the order couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/orders")
    @Timed
    public ResponseEntity<Order> updateOrder(@RequestBody Order order) throws URISyntaxException {
        log.debug("REST request to update Order : {}", order);
        if (order.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Order result = orderRepository.save(order);
        orderSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, order.getId().toString()))
            .body(result);
    }

    /**
     * GET  /orders : get all the orders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orders in body
     */
    @GetMapping("/orders")
    @Timed
    public ResponseEntity<List<Order>> getAllOrders(Pageable pageable) {
        log.debug("REST request to get a page of Orders");
        Page<Order> page = orderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/orders");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /orders/:id : get the "id" order.
     *
     * @param id the id of the order to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the order, or with status 404 (Not Found)
     */
    @GetMapping("/orders/{id}")
    @Timed
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        log.debug("REST request to get Order : {}", id);
        Optional<Order> order = orderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(order);
    }

    /**
     * DELETE  /orders/:id : delete the "id" order.
     *
     * @param id the id of the order to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        log.debug("REST request to delete Order : {}", id);

        orderRepository.deleteById(id);
        orderSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/orders?query=:query : search for the order corresponding
     * to the query.
     *
     * @param query the query of the order search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/orders")
    @Timed
    public ResponseEntity<List<Order>> searchOrders(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Orders for query {}", query);
        Page<Order> page = orderSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/orders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
