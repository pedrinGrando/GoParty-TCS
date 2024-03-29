package go.party.tcs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import go.party.tcs.model.Follower;
import go.party.tcs.model.Usuario;

public interface FollowerRepository extends JpaRepository<Follower, Long> {

    List<Follower> findByFollowing(Usuario following);
    List<Follower> findByFollower(Usuario follower);
    Follower findByFollowerAndFollowing(Usuario follower, Usuario following);

    List<Follower> findByFollowerId(Integer followerId);
}