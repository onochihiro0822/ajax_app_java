package in.tech_camp.ajax_app_java;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig { 
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(authorizeRequests -> authorizeRequests//すべてのリクエストに認証が必要
        .anyRequest().authenticated()
      )
      .formLogin(form -> form//ログイン画面のアクセス許可
        .permitAll() 
      )
      .httpBasic(httpBasicCustomizer -> { });//basic認証を使用する

    return http.build();
  }

  @Bean
  public UserDetailsService userDetailsService(PasswordEncoder encoder) {//basic認証に使用するユーザーの情報を指定する
    String username = System.getenv("BASIC_AUTH_USER");
    String password = System.getenv("BASIC_AUTH_PASSWORD");

    UserDetails user = User.withUsername(username)
        .password(encoder.encode(password))
        .roles("ADMIN")
        .build();
    return new InMemoryUserDetailsManager(user);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }
}