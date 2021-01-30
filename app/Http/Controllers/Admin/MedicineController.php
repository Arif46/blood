<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Medicine;
use App\Models\Symptom;
use Validator;
use Response;

class MedicineController extends Controller
{
    /**
     * Undocumented function
     *
     * @return void
     */

     /**
      * Get all medicine
      */
    public function index(){

        $medicines      = Medicine::join('symptoms','symptoms.id','medicines.symptom_id')
                            ->select('medicines.*','symptoms.name as symptom_name')
                            ->orderBy('symptoms.id','DESC')
                            ->get();
                            
        $symptoms= Symptom::all();
        return view('blood.admin.medicine.medicine', compact('medicines','symptoms'));
    }

    /**
     * Medicine store
     */
    public function store(Request $request)
    { 

        $validators=Validator::make($request->all(),[
            'dose'         => 'required',
        ]);

        if($validators->fails()){ 
            return Response::json(['errors'=>$validators->getMessageBag()->toArray()]);
        } 
            $medicine                = new Medicine();
            $medicine->symptom_id    = $request->symptom_id;
            $medicine->dose          = $request->dose;

            if($medicine->save()){
                return Response::json([
                    'status'    => 201,
                    'message'   => "Medicine created successfully",
                    'data'      => $medicine
                ]);
            }else{
                return Response::json([
                    'status'        => 403,
                    'error_message' => "Sorry, something went wrong",
                    'data'          => []
                ]);
            }
    }
    

     /**
      * Medicine Update
      */
    public function update(Request $request)
    { 

        $validators=Validator::make($request->all(),[
            'dose'         => 'required',
        ]);

        if($validators->fails()){
            return Response::json(['errors'=>$validators->getMessageBag()->toArray()]);
        }

        $medicine                = Medicine::find($request->id);
        $medicine->symptom_id    = $request->symptom_id;
        $medicine->dose          = $request->dose;           
        if($medicine->update()){
            return Response::json([
                'status'    => 201,
                'message'   => "Medicine updated successfully",
                'data'      => $medicine
            ]);
        }else{
            return Response::json([
                'status'        => 403,
                'error_message' => "Sorry, something went wrong",
                'data'          => []
            ]);
        }       
    }

     /**
      * Medicine delete
      */
    public function destroy(Request $request)
    {
        $medicine = Medicine::find($request->id); 
        $medicine->delete();
        return Response::json([
            'status'  => 200,
            'message' => 'Medicine successfully deleted'
        ]);
    }
}
