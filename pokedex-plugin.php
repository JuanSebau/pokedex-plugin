<?php
/*
Plugin Name: Pokedex Plugin
Description: Este es un plugin para mostrar una Pokedex.
Version: 1.0
Author: Juan Sebastian Bautista Diaz
Author URI:
*/

// función para el menú
function pokedex_menu() {
    // Ruta de la imagen
    $icon_path = 'C:\xampp\htdocs\wordpress\wp-content\plugins\pokedex-plugin\imagenes\pokeballred.png';

    // Agrega el menú con la imagen como icono
    add_menu_page(
        'Pokedex Plugin',
        'Pokedex',
        'manage_options',
        'pokedex-plugin',
        'pokedex_admin_page',
        $icon_path, // Ruta de la imagen
        99
    );
}
add_action('admin_menu', 'pokedex_menu');

add_action('admin_menu', 'pokedex_menu');


// Agregar shortcode
function pokedex_shortcode($atts) {
    // Lee y devuelve el tem contenido HTML
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/pokedex-template.php');
    return ob_get_clean();
}
add_shortcode('pokedex', 'pokedex_shortcode');

// Cargar estilos y scripts
function load_pokedex_scripts() {
    wp_enqueue_style('pokedex-style', plugins_url('styles/app.css', __FILE__));
    wp_enqueue_script('pokedex-main', plugins_url('src/main.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'load_pokedex_scripts');


