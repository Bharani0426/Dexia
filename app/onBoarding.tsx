import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState, useRef } from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "./global.css"

// --- Configuration de l'API ---
const API_KEY = "53ca552e5058570f5131bc1817ad1ee5";
const API_BASE_URL = 'https://api.themoviedb.org/3';

interface Genre {
    name: string;
    id: number;
}

// Colors for each genre
// Les couleurs de DÉPART sont les vôtres, les couleurs d'ARRIVÉE sont une version plus foncée.
const genreGradients: { [key: number]: string[] } = {
    28: ['#E53935', '#C62828'], // Action (Rouge)
    12: ['#00897B', '#00695C'], // Aventure (Vert/Bleu)
    16: ['#1E88E5', '#1565C0'], // Animation (Bleu vif)
    35: ['#FBC02D', '#F9A825'], // Comédie (Jaune/Or)
    80: ['#455A64', '#263238'], // Crime (Gris-bleu foncé)
    99: ['#6D4C41', '#4E342E'], // Documentaire (Marron terre)
    18: ['#5E35B1', '#4527A0'], // Drame (Violet profond)
    10751: ['#EC407A', '#D81B60'], // Familial (Rose)
    14: ['#8E24AA', '#6A1B9A'], // Fantastique (Violet magique)
    36: ['#A1887F', '#795548'], // Histoire (Sépia)
    27: ['#B71C1C', '#8A0000'], // Horreur (Rouge sang)
    10402: ['#D81B60', '#AD1457'], // Musique (Magenta)
    9648: ['#004D40', '#00251A'], // Mystère (Vert forêt sombre)
    10749: ['#C2185B', '#A00037'], // Romance (Rose foncé)
    878: ['#546E7A', '#37474F'], // Science-Fiction (Gris "métal")
    10770: ['#757575', '#424242'], // Téléfilm (Gris neutre)
    53: ['#37474F', '#102027'], // Thriller (Gris très sombre)
    10752: ['#556B2F', '#333F1D'], // Guerre (Vert olive)
    37: ['#8D6E63', '#6D4C41'], // Western (Brun "poussière")
};

// Dégradé par défaut pour les genres non trouvés
const defaultGradient = ['#9E9E9E', '#616161']; // Gris



const onBoarding = () => {

    const [genre, setGenre] = useState<Genre[]>([]);

    const [selectedGenres, setSelectedGenres] = useState(new Set<number>());

    useEffect(()=>{
        //fetch les différents genres
        fetchGenre();
    }, [])
    
    async function fetchGenre(){
    
        try {
            const response = await fetch(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
            const data = await response.json();
            
            setGenre(data.genres);

            console.log(data);
        }
    
        catch(e){
            console.log(e);
        }
    }

    function handleSelectGenre(id: number): void {
        setSelectedGenres((prevSelectedGenres) => {
            const newSelectedGenres = new Set(prevSelectedGenres);
            if (newSelectedGenres.has(id)) {
                newSelectedGenres.delete(id);
            } else {
                newSelectedGenres.add(id);
            }
            return newSelectedGenres;
        });
    }

    
    return (
        <ScrollView style={{backgroundColor:"#0f0f1e", flex: 1}}>
            <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%', paddingHorizontal: 16 }}>
                {/* Text : Title */}
                <Text style={{color: "white", fontWeight: "bold", fontSize: 30, textAlign: "center", marginBottom: 8}}>
                    Vos genres préférés
                </Text>

                {/* Text : Description */}
                <Text style={{color: "#99a0ac", fontSize: 16, textAlign: "center", marginBottom: 24}}>
                    Selectionnez au moins 3 genres pour personnaliser vos recommandations
                </Text>

                <View style={styles.genreGrid}>
                    {genre.map((genre) => {
                        const isSelected = selectedGenres.has(genre.id);
                        
                        // On récupère le TABLEAU de dégradé, ou le dégradé par défaut
                        const gradient = genreGradients[genre.id] || defaultGradient;
                        
                        // On garde la couleur de base (plus claire) pour l'icône "check"
                        const checkIconColor = gradient[0];

                        return (
                            <Pressable
                                key={genre.id}
                                // Le style de la carte n'a PLUS de 'backgroundColor'
                                style={styles.genreCard} 
                                onPress={() => handleSelectGenre(genre.id)}
                            >
                                {/* On enveloppe TOUT le contenu dans le LinearGradient.
                                Il gère le dégradé 'to-br' (vers le bas à droite).
                                */}
                                <LinearGradient
                                    colors={gradient as [string, string]}
                                    start={{ x: 0, y: 0 }} // coin 'top-left'
                                    end={{ x: 1, y: 1 }}   // coin 'bottom-right'
                                    style={styles.gradientFill} // Style pour remplir la carte
                                >
                                    {/* Overlay (visible si 'isSelected' est true) */}
                                    <View style={[styles.overlay, isSelected && styles.overlayVisible]} />

                                    {/* Contenu (z-index est géré par l'ordre) */}
                                    <View style={styles.cardContent}>
                                        <Image
                                            source={{ uri: "https://img.icons8.com/sf-black/64/movie.png" }}
                                            style={styles.cardIcon}
                                        />
                                        <Text style={styles.cardText}>{genre.name}</Text>
                                    </View>

                                    {/* Icône Check (visible si 'isSelected' est true) */}
                                    {/* On utilise {isSelected && ...} pour un rendu conditionnel propre */}
                                    {isSelected && (
                                        <View style={styles.checkIcon}>
                                            <Text style={[styles.checkMark, { color: checkIconColor }]}>
                                                ✓
                                            </Text>
                                        </View>
                                    )}
                                    
                                </LinearGradient>
                            </Pressable>
                        )
                    })}
                </View>
                
                <View>
                    {/* Text : Number of genres selected */}
                    <Text style={{color: "white", textAlign: "center", marginTop: 16, marginBottom: 8}}>
                        0/3 genres selectionnés
                    </Text>

                    {/* Button : Continue */}
                    
                    <Pressable>
                        <Text style={{color: "white", textAlign: "center", backgroundColor:"red"}}>Continuer</Text>
                    </Pressable>
                </View>
                
            </View>
        </ScrollView> 
    )
}

export default onBoarding

const styles = StyleSheet.create({

    genreGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginHorizontal: -6, // Compense le margin des cartes
    },
    genreCard: {
        // Dimensions et espacement
        width: '45%',
        aspectRatio: 1.2,
        borderRadius: 24, // "rounded-2xl"
        
        // Positionnement 
        position: 'relative',
        overflow: 'hidden', // "overflow-hidden"
        margin: 6,
        // PAS DE backgroundColor ICI
    },
    gradientFill: {
        // Style pour que le dégradé remplisse la carte
        flex: 1,
        padding: 16,// Aligne le contenu en bas
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
        opacity: 0,
    },
    overlayVisible: {
        opacity: 0.4,
    },
    cardContent: {
    },
    cardIcon: {
        width: 32,
        height: 32,
        marginBottom: 8,
        tintColor: 'white',
    },
    cardText: {
        color: "white",
        fontWeight: '600',
        fontSize: 18,
    },
    checkIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 24,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        // 'display' est géré par le rendu conditionnel {isSelected && ...}
    },
    checkMark: {
        fontSize: 14,
        fontWeight: 'bold',
        // la couleur est appliquée dynamiquement
    }
    
})


/*

*/
