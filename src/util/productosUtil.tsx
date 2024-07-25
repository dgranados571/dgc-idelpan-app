import React from 'react'

const productosUtil = () => {

    const productosDetalle: { [key: string]: { nombre: string; PxC: number; valorPaquete: number, valorCanasta: number } } = {
        'IP_Prod_001': {
            nombre: 'PAN MANTEQUILLA X 10',
            PxC: 20,            
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_002': {
            nombre: 'PAN MANTEQUILLA X 12',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
            
        },
        'IP_Prod_003': {
            nombre: 'PAN MAÍZ X 10',
            PxC: 20,            
            valorPaquete: 1600,
            valorCanasta: 32000        
        },
        'IP_Prod_004': {
            nombre: 'PAN MAÍZ X 12',
            PxC: 15,            
            valorPaquete: 1783,
            valorCanasta: 26750           
        },
        'IP_Prod_005': {
            nombre: 'PAN X UNIDAD',
            PxC: 72,            
            valorPaquete: 292,
            valorCanasta: 21000        
        },
        'IP_Prod_006': {
            nombre: 'PAN MANTEQUILLA ESPECIAL X 6',
            PxC: 15,            
            valorPaquete: 1783,
            valorCanasta: 26750        
        },
        'IP_Prod_007': {
            nombre: 'QUESO GIGANTE',
            PxC: 15,            
            valorPaquete: 1783,
            valorCanasta: 26750         
        },
        'IP_Prod_008': {
            nombre: 'SUPER QUESO GIGANTE',
            PxC: 10,            
            valorPaquete: 3000,
            valorCanasta: 30000        
        },
        'IP_Prod_009': {
            nombre: 'MANTEQUILLA TAJADO',
            PxC: 15,            
            valorPaquete: 1783,
            valorCanasta: 26750        
        },
        'IP_Prod_010': {
            nombre: 'MAIZ MEDIANO',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_011': {
            nombre: 'MAIZ TAJADO FAMILIAR',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
        },
        'IP_Prod_012': {
            nombre: 'PAN DE QUESO',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_013': {
            nombre: 'PAN TRENZA',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_014': {
            nombre: 'PAN ROLLO X 5',
            PxC: 25,
            valorPaquete: 1600,
            valorCanasta: 40000
        },
        'IP_Prod_015': {
            nombre: 'PAN ROLLO X 6',
            PxC: 20,
            valorPaquete: 1783,
            valorCanasta: 35650
        },
        'IP_Prod_016': {
            nombre: 'PAN CHINO X 5',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_017': {
            nombre: 'PAN CHINO X 6',
            PxC: 20,
            valorPaquete: 1783,
            valorCanasta: 35650
        },
        'IP_Prod_018': {
            nombre: 'ROSCÓN X 5',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_019': {
            nombre: 'ROSCÓN X 6',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
        },
        'IP_Prod_020': {
            nombre: 'ROSCÓN X 1',
            PxC: 15,
            valorPaquete: 1600,
            valorCanasta: 24000
        },
        'IP_Prod_021': {
            nombre: 'TUNJANO X 10',
            PxC: 24,
            valorPaquete: 1600,
            valorCanasta: 38400
        },
        'IP_Prod_022': {
            nombre: 'BLANCA X 10',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_023': {
            nombre: 'BLANCA X 12',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
        },
        'IP_Prod_024': {
            nombre: 'NEVADA X 6',
            PxC: 12,
            valorPaquete: 1783,
            valorCanasta: 21400
        },
        'IP_Prod_025': {
            nombre: 'NEGRA X 6',
            PxC: 12,
            valorPaquete: 1783,
            valorCanasta: 21400
        },
        'IP_Prod_026': {
            nombre: 'NEGRA X 10',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_027': {
            nombre: 'NEGRA X 12',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
        },
        'IP_Prod_028': {
            nombre: 'MOGOLLA ESPECIAL X 10',
            PxC: 13,
            valorPaquete: 2800,
            valorCanasta: 36400
        },
        'IP_Prod_029': {
            nombre: 'INTEGRAL X 10',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_030': {
            nombre: 'INTEGRAL X 12',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
        },
        'IP_Prod_031': {
            nombre: 'CHOCOLATE X 5',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_032': {
            nombre: 'CHOCOLATE X 6',
            PxC: 15,
            valorPaquete: 1783,
            valorCanasta: 26750
        },
        'IP_Prod_033': {
            nombre: 'PAN DE CAFÉ',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_034': {
            nombre: 'CALENTANOS X 18',
            PxC: 20,
            valorPaquete: 1600,
            valorCanasta: 32000
        },
        'IP_Prod_035': {
            nombre: 'PALITOS DE CAFÉ',
            PxC: 30,
            valorPaquete: 1600,
            valorCanasta: 48000
        },
        'IP_Prod_036': {
            nombre: 'PALITOS DE LECHE',
            PxC: 30,
            valorPaquete: 1600,
            valorCanasta: 48000
        },
        'IP_Prod_037': {
            nombre: 'CALAO X 10',
            PxC: 15,
            valorPaquete: 1600,
            valorCanasta: 24000
        },
        'IP_Prod_038': {
            nombre: 'TOSTADA MEDIANA X 12',
            PxC: 30,
            valorPaquete: 1600,
            valorCanasta: 48000
        },
        'IP_Prod_039': {
            nombre: 'TOSTADA GRANDE X 12',
            PxC: 20,
            valorPaquete: 1800,
            valorCanasta: 36000
        },
        'IP_Prod_040': {
            nombre: 'TOSTADA BLANCA X 24',
            PxC: 14,
            valorPaquete: 2900,
            valorCanasta: 40600
        },
        'IP_Prod_041': {
            nombre: 'TOSTADA INTEGRAL MEDIANA X 12',
            PxC: 30,
            valorPaquete: 1600,
            valorCanasta: 48000
        },
        'IP_Prod_042': {
            nombre: 'TOSTADA INTEGRAL X 24',
            PxC: 14,
            valorPaquete: 2900,
            valorCanasta: 40600
        },
        'IP_Prod_043': {
            nombre: 'COTUDOS X 6',
            PxC: 24,
            valorPaquete: 1600,
            valorCanasta: 38400
        },
        'IP_Prod_044': {
            nombre: 'PULLMAN FAMILIAR',
            PxC: 10,
            valorPaquete: 3600,
            valorCanasta: 36000
        },
        'IP_Prod_045': {
            nombre: 'PULLMAN TRADICIONAL',
            PxC: 10,
            valorPaquete: 3200,
            valorCanasta: 32000
        },
        'IP_Prod_046': {
            nombre: 'PULLMAN MEDIANO',
            PxC: 14,
            valorPaquete: 2500,
            valorCanasta: 35000
        },
        'IP_Prod_047': {
            nombre: 'PULLMAN MINI',
            PxC: 20,
            valorPaquete: 1650,
            valorCanasta: 33000
        },
        'IP_Prod_048': {
            nombre: 'NAVIDEÑO 500G',
            PxC: 7,
            valorPaquete: 4850,
            valorCanasta: 33950
        }
    }

    return {
        productosDetalle
    }

}

export default productosUtil