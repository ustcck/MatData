package cn.ustcdata.matdata.repository.search;

import cn.ustcdata.matdata.domain.Order;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Order entity.
 */
public interface OrderSearchRepository extends ElasticsearchRepository<Order, Long> {
}
