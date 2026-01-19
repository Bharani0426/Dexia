import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, FadeInDown, ZoomIn } from "react-native-reanimated";
import { Link, router } from "expo-router";

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

const GenreCard = ({ genre, isSelected, onToggle }: { genre: Genre, isSelected: boolean, onToggle: (id: number) => void }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    const gradient = genreGradients[genre.id] || defaultGradient;
    const checkIconColor = gradient[0];

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(Math.random() * 300).springify()}
            style={[styles.genreCardWrapper, animatedStyle]}
        >
            <Pressable
                style={styles.genreCard}
                onPress={() => onToggle(genre.id)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <LinearGradient
                    colors={gradient as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientFill}
                >
                    <Animated.View style={[styles.overlay, isSelected && styles.overlayVisible]} />

                    <View style={styles.cardContent}>
                        <Image
                            source={{ uri: "https://img.icons8.com/sf-black/64/movie.png" }}
                            style={styles.cardIcon}
                        />
                        <Text style={styles.cardText}>{genre.name}</Text>
                    </View>

                    {isSelected && (
                        <Animated.View
                            entering={ZoomIn}
                            style={styles.checkIcon}
                        >
                            <Text style={[styles.checkMark, { color: checkIconColor }]}>✓</Text>
                        </Animated.View>
                    )}
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
};



const onBoarding = () => {

    const [genre, setGenre] = useState<Genre[]>([]);

    const [selectedGenres, setSelectedGenres] = useState(new Set<number>());

    useEffect(() => {
        //fetch les différents genres
        fetchGenre();
    }, [])

    async function fetchGenre() {

        try {
            const response = await fetch(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
            const data = await response.json();

            setGenre(data.genres);

            console.log(data);
        }

        catch (e) {
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

    const canContinue = selectedGenres.size >= 3;

    const handleContinue = () => {
        if (!canContinue) return;
        // Navigation ou action suivante ici
        console.log("Genres sélectionnés:", Array.from(selectedGenres));
        router.replace("/(tabs)/home"); // Exemple de redirection
    };

    return (
        <ScrollView style={{ backgroundColor: "#0f0f1e", flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%', paddingHorizontal: 16, paddingTop: 60 }}>
                {/* Text : Title */}
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 32, textAlign: "center", marginBottom: 8 }}>
                    Vos genres préférés
                </Text>

                {/* Text : Description */}
                <Text style={{ color: "#99a0ac", fontSize: 16, textAlign: "center", marginBottom: 32 }}>
                    Selectionnez au moins 3 genres pour personnaliser vos recommandations
                </Text>

                <View style={styles.genreGrid}>
                    {genre.map((g) => (
                        <GenreCard
                            key={g.id}
                            genre={g}
                            isSelected={selectedGenres.has(g.id)}
                            onToggle={handleSelectGenre}
                        />
                    ))}
                </View>

            </View>

            {/* Sticky Bottom Container */}
            <LinearGradient
                colors={['transparent', '#0f0f1e']}
                style={styles.bottomContainer}
                pointerEvents="box-none"
            >
                <View style={styles.bottomContent}>
                    <Text style={{ color: canContinue ? "#4ADE80" : "white", textAlign: "center", marginBottom: 16, fontWeight: "600" }}>
                        {selectedGenres.size}/3 genres sélectionnés
                    </Text>

                    <Pressable
                        onPress={handleContinue}
                        style={({ pressed }) => [
                            styles.continueButton,
                            !canContinue && styles.continueButtonDisabled,
                            pressed && canContinue && { opacity: 0.8 }
                        ]}
                        disabled={!canContinue}
                    >
                        <Text style={[styles.continueButtonText, !canContinue && styles.continueButtonTextDisabled]}>
                            Continuer
                        </Text>
                    </Pressable>
                </View>
            </LinearGradient>
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
        marginHorizontal: -6,
    },
    genreCardWrapper: {
        width: '45%',
        aspectRatio: 1.2,
        margin: 6,
    },
    genreCard: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
        overflow: 'hidden',
    },
    gradientFill: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
        opacity: 0,
    },
    overlayVisible: {
        opacity: 0.6,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cardIcon: {
        width: 32,
        height: 32,
        marginBottom: 8,
        tintColor: 'white',
    },
    cardText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16,
    },
    checkIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        backgroundColor: 'white',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkMark: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
    },
    bottomContent: {
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    continueButton: {
        backgroundColor: '#E50914', // Netflix Red
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: "#E50914",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    continueButtonDisabled: {
        backgroundColor: '#333333',
        shadowOpacity: 0,
        elevation: 0,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    continueButtonTextDisabled: {
        color: '#666666',
    }
})


/*

*/
