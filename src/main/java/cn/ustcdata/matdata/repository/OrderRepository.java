package cn.ustcdata.matdata.repository;

import cn.ustcdata.matdata.domain.Order;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select jhi_order from Order jhi_order where jhi_order.user.login = ?#{principal.username}")
    List<Order> findByUserIsCurrentUser();

}
