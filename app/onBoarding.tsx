import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import "./global.css"

// --- Configuration de l'API ---
const API_KEY = "53ca552e5058570f5131bc1817ad1ee5";
const API_BASE_URL = 'https://api.themoviedb.org/3';

interface Genre {
    name: string;
    id: number;
}


const onBoarding = () => {

    const [genre, setGenre] = useState<Genre[]>([]);

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
    
    return (
        <ScrollView>
            {genre.map((genre) => (
                <Button title={genre.name}/>
            ))}
        </ScrollView> 
    )
}

export default onBoarding

const styles = StyleSheet.create({})