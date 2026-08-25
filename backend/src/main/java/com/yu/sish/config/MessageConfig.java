package com.yu.sish.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.Locale;

@Configuration
public class MessageConfig {

    private static final Locale DEFAULT = Locale.forLanguageTag("ar");
    private static final List<String> SUPPORTED = List.of("ar", "en");

    @Bean
    public MessageSource messageSource() {
        var source = new ReloadableResourceBundleMessageSource();
        source.setBasename("classpath:messages");
        source.setDefaultEncoding("UTF-8");
        source.setFallbackToSystemLocale(false);
        return source;
    }

    @Bean
    public LocalValidatorFactoryBean getValidator(MessageSource messageSource) {
        var factory = new LocalValidatorFactoryBean();
        factory.setValidationMessageSource(messageSource);
        return factory;
    }

    @Bean
    public LocaleResolver localeResolver() {
        return new LocaleResolver() {
            @Override
            public Locale resolveLocale(HttpServletRequest request) {
                String locale = request.getParameter("locale");
                return locale != null && SUPPORTED.contains(locale)
                        ? Locale.forLanguageTag(locale)
                        : DEFAULT;
            }

            @Override
            public void setLocale(HttpServletRequest request,
                                  HttpServletResponse response,
                                  Locale locale) {
                throw new UnsupportedOperationException("Locale is request-scoped");
            }
        };
    }
}