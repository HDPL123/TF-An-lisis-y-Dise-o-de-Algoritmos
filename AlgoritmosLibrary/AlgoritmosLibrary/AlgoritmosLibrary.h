#pragma once

#ifdef ALGORITMOLIBRARY_EXPORTS
#define ALGORITMOLIBRARY_API __declspec(dllexport)  
#else
#define ALGORITMOLIBRARY_API __declspec(dllimport)  
#endif

using namespace std;

extern "C" ALGORITMOLIBRARY_API double haversine(double lat1, double lon1, double lat2, double lon2);

extern "C" ALGORITMOLIBRARY_API vector<vector<double>> calcularDistancias(const vector<tuple<string, double, double>>& ciudades);

extern "C" ALGORITMOLIBRARY_API vector<int> Prim(const vector<vector<double>>& matriz);

extern "C" ALGORITMOLIBRARY_API vector<int> Greedy(const vector<vector<double>>& matriz);

extern "C" ALGORITMOLIBRARY_API vector<int> Dijkstra(const vector<vector<double>>& matriz);

extern "C" ALGORITMOLIBRARY_API vector<int> Kruskal(const vector<vector<double>>& matriz);

extern "C" ALGORITMOLIBRARY_API void imprimirRuta(const vector<int>& ruta, const vector<tuple<string, double, double>>& ciudades);

extern "C" ALGORITMOLIBRARY_API double calcularKMruta(const vector<int>& ruta, const vector<vector<double>>& matriz);




