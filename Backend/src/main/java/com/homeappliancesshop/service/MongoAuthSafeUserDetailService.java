package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Admin;
import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.repository.AdminRepository;
import com.homeappliancesshop.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class MongoAuthSafeUserDetailService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;


    @Override
    public UserDetails loadUserByUsername(String username) {
        Person user = personRepository.findByEmail(username);

        if (user == null) {
            return new User("null", "null", new ArrayList<>());
            //throw new UsernameNotFoundException("Invalid username or password.");
        }

        return new User(user.getEmail(), user.getPassword(), getRoles(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> getRoles(ArrayList<String> roles) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }

        return authorities;
    }

}
